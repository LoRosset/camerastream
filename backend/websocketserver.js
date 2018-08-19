//const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const server = http.createServer(function(request, response) {});
const wss = new WebSocket.Server({ server, clientTracking: true });

const API_URL = 'http://localhost:3000/v1/app';
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
    else if(message.includes("camera")){ // TODO
      console.log('Register cameras now...');
      var cameras = JSON.parse(message);
      axios.get(API_URL + '/box/' + ws._id, { headers: { Authorization: AUTH } }).then(response => {
        if(!response.data.cameras){
          axios.post(API_URL + '/box/' + ws._id + '/camera/create', { headers: { Authorization: AUTH }, body: cameras }).then(response => {
            console.log('Successfully create : %s', response.data);
          }).catch((error) => {
            console.log('error %s', error);
          })
        }
        else{
          console.log('cameras already exist'); // TODO
        }
      });
    }
    else if(message.includes("connexion")){
      var request = JSON.parse(message);
      var id = request.boxID;
      var obj = { msg: 'connexion', camera: request.cameraId}
      console.log("Request for connexion on camera for box id: %s", id);
      wss.clients.forEach(function each(client) {
        if(client._id === id){
          client.send(JSON.stringify(obj));
        }
      });
    }
    else if(message.includes("kill")){
      var request = JSON.parse(message);
      var id = request.boxID;
      var obj = { msg: 'kill'}
      console.log("Request for killing connexion on camera for box id: %s", id);
      wss.clients.forEach(function each(client) {
        if(client._id === id){
          client.send(JSON.stringify(obj));
        }
      });
    }
    else{
      ws.send('your message is '+ message);
    }
    
  });

});

module.exports = server