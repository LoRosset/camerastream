const getPort = require('get-port');
const proxy = require('koa-better-http-proxy');
const WebSocket = require('ws');
const ws = new WebSocket('wss://camera-stream.tk:8001');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function findPort (ctx) {
    var port = await getPort();
    ctx.body = {port: port.toString()};
}

async function createProxy (ctx) {
	const box = ctx.params.box_id;
	const camera = ctx.params.camera_id;
	const port = await getPort();
	const portToProxy = port.toString();
	console.log('Available port : %s', portToProxy);
	var request = {msg: 'connexion', boxId: box, cameraId: camera, port: portToProxy}
	//send message to websocket server, to open connection at the box
	ws.send(JSON.stringify(request));
	//create proxy
    		//websocket answer for request of box
    await sleep(2000);
    const p = proxy('camera-stream.tk', {
    	port: portToProxy,
    	proxyReqPathResolver: (ctx) => { return '/axis-cgi/mjpg/video.cgi';}
    });
    console.log('Created Proxy');
    await p(ctx);
}

module.exports = {
	findPort,
	createProxy
}