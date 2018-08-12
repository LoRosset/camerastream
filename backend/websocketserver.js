//const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer(function(request, response) {});
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
  const ip = req.connection.remoteAddress.replace(/^.*:/, '');
  console.log(ip);
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('hello, your ip address is : '+ ip);
  });

});

module.exports = server