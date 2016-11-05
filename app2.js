// socket.io chart server without express.js
var http = require('http');
var fs = require("fs");
var socketIO = require('socket.io');    // Step 1 : require thi socket.io 3rd party module 
var port = process.env.PORT || 3000;


var httpHandler = function(req, res){
	fs.readFile(__dirname + '/index2.html', function(error, fileData){
	if (error){
		console.log("File not found!!");
		res.writeHead(404);
		res.end("File not found!!");
	}else{
		res.writeHead(200);
		res.end(fileData);
	}
	});
}

var httpServer = http.createServer(httpHandler);

var io = socketIO(httpServer); // Step 2 : initialize socketio using httpServer object


io.on('connection', function(socket){  // step 3: Handle  standard event 'connection' on io object and receive a client socket
  console.log('a user connected');
  
  socket.on('disconnect', function(){  //step 4: write a handler for the 'disconnect' event on the client socket
  	console.log('a user disconnected');
  });

  socket.on('chat-message', function(msg){ // step 5: write handler for various user events 
    console.log('message: ' + msg);
    io.emit('chat-message', 'server broadcast ' + msg);  // step 6: use io.emit method on io to broadcast ao all connected users
  });
});


httpServer.listen(port, function(){
  console.log('listening on   *: ' + port);
});