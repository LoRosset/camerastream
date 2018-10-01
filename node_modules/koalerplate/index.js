require('dotenv').config();
const server = require('./server')
const websocketserver = require('./websocketserver')
const https = require('https')
const fs = require('fs')

var options = {
  cert: fs.readFileSync('/etc/letsencrypt/archive/camera-stream.tk/cert1.pem'),
  key: fs.readFileSync('/etc/letsencrypt/archive/camera-stream.tk/privkey1.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/archive/camera-stream.tk/chain1.pem')
}

const websocketport = 8001
const port = process.env.PORT || 3000

https.createServer(options, server.callback()).listen(port, () => console.log(`API server started on ${port}`))
//server.listen(port, () => console.log(`API server started on ${port}`))
websocketserver.listen(websocketport, () => console.log(`Websocket server started on ${websocketport}`))