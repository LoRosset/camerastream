const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const axios = require('axios');
const jwt = require('jsonwebtoken');
//const kill = require('kill-port');

const server = https.createServer({
  cert: fs.readFileSync('/etc/letsencrypt/archive/camera-stream.tk/cert1.pem'),
  key: fs.readFileSync('/etc/letsencrypt/archive/camera-stream.tk/privkey1.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/archive/camera-stream.tk/fullchain1.pem'),
  rejectUnauthorized: false
});


const wss = new WebSocket.Server({ server });

const API_URL = 'https://camera-stream.tk:3000/v1/app';
const TOKEN = jwt.sign({ admin: true }, 'A very secret key');
const AUTH = 'Bearer '.concat(TOKEN);

wss.on('connection', function connection(ws, req) {
  
  const ip = req.connection.remoteAddress.replace(/^.*:/, '');
  console.log('ip address: %s',ip);

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    if(message.includes("verify")){
      var obj = JSON.parse(message);
      if(obj.hasOwnProperty('box')){
        var macAddress = obj.box;
        var trueBox = false;
        var connection = null;
        axios.get(API_URL + '/box', { headers: { Authorization: AUTH } }).then(response => {
          var boxArray = response.data;
          boxArray.forEach(function(box) {
            if(box.ip === ip && box.mac === macAddress){
              console.log('Connection accepted.');
              trueBox = true;
              ws._id = box._id;
              //ws.proxyPort = {};
              return;
            }
          });
          if (trueBox == false) {
            console.log('Close connection for %s', ip);
            ws.close();
          }
        })
      }
/*      else if(obj.hasOwnProperty('api')){
        var api = obj.api;
        if(api === 'i am the real api' && ip === '51.15.227.253'){
          ws._id = 'api';
        }
        else {
          console.log('Close connection for %s', ip);
          ws.close();
        }
      }*/
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
      var obj = { msg: 'connexion', camera: request.cameraId, port: port, boxId: id}
      console.log("Request for connexion on camera for box:%s, on port:%s", id, port);
      wss.clients.forEach(function each(client) {
        if(client._id === id){
          client.send(JSON.stringify(obj));
        }
      });
    }
    else if(message.includes("stream")){
       var request = JSON.parse(message);
       var id = request.boxId;
       var camera = request.cameraId;
       var open = request.open;
       console.log("Stream:%s for box:%s", open, id);
/*       var answer = {msg: id, camera: camera};
       wss.clients.forEach(function each(client) {
         if(client._id === 'api'){
           client.send(JSON.stringify(answer));
         }
      });*/
    }
    else if(message.includes("kill")){
      var request = JSON.parse(message);
      var id = request.boxId;
      var camera = request.cameraId;
      var obj = { msg: 'kill', camera: camera, boxId: id}
      console.log("Request for killing connexion on %s for box id: %s", camera, id);
      wss.clients.forEach(function each(client) {
        if(client._id === id){
          client.send(JSON.stringify(obj));
          //console.log("Request for killing proxy connexion on port: %s", client.proxyPort[camera]);
          //kill(client.proxyPort[camera]).then(console.log).catch(console.log);
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