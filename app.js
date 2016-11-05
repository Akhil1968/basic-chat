var http = require('http');
var express = require('express');
var port = process.env.PORT || 4000;
var socketIO = require('socket.io'); // Step 1 : require thi socket.io 3rd party module 

var app = express();
var httpServer = http.createServer(app); // Step 2 : initialize socketio using httpServer object
var io = socketIO(httpServer);


app.use(express.static(__dirname + "/public"));

io.on('connection', function(socket){ // step 3: Handle  standard event 'connection' on io object and receive a client socket
  console.log('a user connected');
  
  socket.on('disconnect', function(){ //step 4: write a handler for the 'disconnect' event on the client socket
  	console.log('a user disconnected');
  });

  socket.on('chat-message', function(msg){ // step 5: write handler for various user events 
    io.emit('chat-message', 'server broadcast ' + msg);
  });
});


httpServer.listen(3000, function(){
  console.log('listening on *:3000');
});