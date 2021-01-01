var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http,{
    cors: {
        origin: '*',
    }
});

var bodyParser = require('body-parser');

var CatchAllApiCalls = require('./api/index');

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
    socket.on('JOIN_ROOM',room => {
        socket.join(room.roomId);
    });
    socket.on('NEW_MESSAGE', (message) => {
        io.to(message.roomId).emit('NEW_MESSAGE',message);
    });
});

http.listen(5000,()=>{
    console.log('surfy server is listening..');
});