var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http,{
    cors: {
        origin: '*',
    }
});

var bodyParser = require('body-parser');

var CatchAllCalls = require('./api/index');

app.use(bodyParser.json())

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials','true');
    res.header('Access-Control-Allow-Methods','GET,HEAD,OPTIONS,POST,PUT');
    next();
});



CatchAllCalls(app);

io.on('connection', (socket) => {
    console.log('a user connected');
});

http.listen(5000,()=>{
    console.log('surfy server is listening..');
});