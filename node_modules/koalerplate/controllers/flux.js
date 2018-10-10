const getPort = require('get-port');
const http = require('http');
const httpProxy = require('http-proxy');
const fs = require('fs');

async function findPort (ctx) {
    var port = await getPort();
    ctx.body = {port: port.toString()};
}

async function createProxy (ctx) {
	const portToProxy = ctx.request.body.port
    const port = await getPort();
    httpProxy.createServer({
    	target : {
    		host: 'camera-stream.tk',
    		port: portToProxy
    	},
    	ssl: {
			cert: fs.readFileSync('/etc/letsencrypt/archive/camera-stream.tk/cert1.pem'),
			key: fs.readFileSync('/etc/letsencrypt/archive/camera-stream.tk/privkey1.pem'),
			ca: fs.readFileSync('/etc/letsencrypt/archive/camera-stream.tk/fullchain1.pem')
    	}
    }).listen(port);
    console.log('Created Proxy on port:%s', port);
    ctx.body = {port: port};
}

module.exports = {
	findPort,
	createProxy
}