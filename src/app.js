var app = require('express')();
var http = require('http').createServer(app);

var CatchAllCalls = require('./api/index');

CatchAllCalls(app);

http.listen(5000,()=>{
    console.log('surfy server is listening..');
});