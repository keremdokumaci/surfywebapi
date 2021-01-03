var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http,{
    cors: {
        origin: '*',
    }
});

var bodyParser = require('body-parser');

var CatchAllApiCalls = require('./api/index');

var ChatroomService = require('./services/Chatroom/index');

app.use(bodyParser.json())

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials','true');
    res.header('Access-Control-Allow-Methods','GET,HEAD,OPTIONS,POST,PUT');
    next();
});



CatchAllApiCalls(app);

io.on('connection', (socket) => {
    socket.on('JOIN_ROOM',(data) => {
        socket.join(data.roomId);
        ChatroomService.AddUserToChatroom(data.user,data.roomId);

        socket.on('ENABLE_CAM',(camData) => {
            ChatroomService.ChangeEnableCamStatus(camData.roomId, camData.user.user, camData.enable);
            io.to(camData.roomId).emit('ENABLE_CAM',camData);
        });
    });

    socket.on('NEW_MESSAGE', (message) => {
        io.to(message.roomId).emit('NEW_MESSAGE',message);
    });

    socket.on('NEW_FRAME', (data) => {
        io.to(data.roomId).emit('NEW_FRAME',data);
    });

    socket.on('disconnect', () => {
        console.log('DISCONNECTION');
    });
});

http.listen(5000,'192.168.1.38',()=>{
    console.log('surfy server is listening..');
});