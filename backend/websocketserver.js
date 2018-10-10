const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const kill = require('kill-port');

const server = https.createServer({
  cert: fs.readFileSync('/etc/letsencrypt/archive/camera-stream.tk/cert1.pem'),
  key: fs.readFileSync('/etc/letsencrypt/archive/camera-stream.tk/privkey1.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/archive/camera-stream.tk/fullchain1.pem'),
  rejectUnauthorized: false
});
const wss = new WebSocket.Server({ server, clientTracking: true });

const API_URL = 'https://camera-stream.tk:3000/v1/app';
const TOKEN = jwt.sign({ admin: true }, 'A very secret key');
const AUTH = 'Bearer '.concat(TOKEN);

wss.on('connection', function connection(ws, req) {
  
  const ip = req.connection.remoteAddress.replace(/^.*:/, '');
  console.log('ip address: %s',ip);

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    if(message.includes("mac")){
      //this verify the client, if it is a box or not, however this could be implemented in a VerifyClient function to be more secure
      var obj = JSON.parse(message);
      var macAddress = obj.mac;
      var trueBox = false;
      var connection = null;
      axios.get(API_URL + '/box', { headers: { Authorization: AUTH } }).then(response => {
        var boxArray = response.data;
        boxArray.forEach(function(box) {
          if(box.ip === ip && box.mac === macAddress){
            console.log('Connection accepted.');
            trueBox = true;
            ws._id = box._id;
            return;
          }
        });
        if (trueBox == false) {
        console.log('Close connection');
        ws.close();
        }
      })
    }
    else if(message.includes("getCameras")){
      var request = JSON.parse(message);
      var id = request.boxId;
      var obj = { msg: 'camera'};
      console.log("Request for cameras for box id: %s", id);
      wss.clients.forEach(function each(client) {
        if(client._id === id){
          client.send(JSON.stringify(obj));
        }
      });
    }
    else if(message.includes("ip")){
      console.log('Register cameras now...');
      var cameras = JSON.parse(message);
      axios.post(API_URL + '/box/' + ws._id, cameras, { headers: { Authorization: AUTH }}).then(response => {
        console.log('Successfully create : %s', response.data);
      }).catch((error) => {
        console.log('error %s', error);
      });
    }
    else if(message.includes("connexion")){
      var request = JSON.parse(message);
      var id = request.boxId;
      var port = request.port;
      var obj = { msg: 'connexion', camera: request.cameraId, port: port}
      console.log("Request for connexion on camera for box:%s, on port:%s", id, port);
      wss.clients.forEach(function each(client) {
        if(client._id === id){
          client.send(JSON.stringify(obj));
        }
      });
    }
    else if(message.includes("proxyPort")){
      var request = JSON.parse(message);
      var id = request.boxId;
      var camera = request.cameraId;
      var port = request.port;
      console.log("Register proxyPort for box:%s", id);
      wss.clients.forEach(function each(client) {
        if(client._id === id){
          client.proxyPort.camera = port;
        }
      });
    }
    else if(message.includes("kill")){
      var request = JSON.parse(message);
      var id = request.boxId;
      var camera = request.cameraId;
      var obj = { msg: 'kill', camera: camera}
      console.log("Request for killing connexion on %s for box id: %s", camera, id);
      wss.clients.forEach(function each(client) {
        if(client._id === id){
          client.send(JSON.stringify(obj));
          console.log("Request for killing proxy connexion on port: %s", request.proxyPort);
          kill(client.proxyPort.camera).then(console.log).catch(console.log);
        }
      });
    }
    else{
      var obj = { msg: 'your message is '+ message}
      ws.send(JSON.stringify(obj));
    }
    
  });

});

module.exports = server