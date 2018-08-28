require('dotenv').config();
const server = require('./server')
const websocketserver = require('./websocketserver')

const websocketport = 8001
const port = process.env.PORT || 3000
server.listen(port, () => console.log(`API server started on ${port}`))
websocketserver.listen(websocketport, () => console.log(`Websocket server started on ${websocketport}`))