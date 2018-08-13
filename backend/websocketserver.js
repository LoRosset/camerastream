//const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');
const axios = require('axios');

const server = http.createServer(function(request, response) {});
const wss = new WebSocket.Server({ server });


var connections = {};
var connectionIDCounter = 0;


wss.on('connection', function connection(ws, req) {
  

  const ip = req.connection.remoteAddress.replace(/^.*:/, '');
  console.log('ip address: %s',ip);


  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    if(message.includes("mac")){
      var obj = JSON.parse(message);
      var macAddress = obj.mac;
      var connection = null;
      axios.get('http://localhost:3000/v1/app/box').then(response => {
        var boxArray = response.data;
        boxArray.forEach(function(box) {
          if(box.ip === ip && box.mac === macAddress){
            connection = ws;
            connection.id = box._id;
            connections[connection.id] = connection;
            return;
          }
        })
      })
      if (connection == null) {
        ws.close();
      }
    }
    else if(message.includes("getCameras")){
      var request = JSON.parse(message);
      var id = request.boxID;
      console.log("Request for cameras for box id: %s", id);
      connections[id].send("camera");
    }
    else if(message.includes("camera")){
      console.log(message);
    }
    else if(message.includes("connexion")){
      var request = JSON.parse(message);
      var id = request.boxID;
      var obj = { msg: 'connexion', camera: request.cameraId}
      connections[id].send(JSON.stringify(obj));
      console.log("Request for connexion on camera for box id: %s", id);
    }
    else if(message.includes("kill")){
      var request = JSON.parse(message);
      var id = request.boxID;
      var obj = { msg: 'kill'}
      connections[id].send(JSON.stringify(obj));
      console.log("Request for killing connexion on camera for box id: %s", id);
    }
    else{
      ws.send('your message is '+ message);
    }
    
  });

});

module.exports = server