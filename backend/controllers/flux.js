const getPort = require('get-port');
const proxy = require('koa-better-http-proxy');
const WebSocket = require('ws');
const ws = new WebSocket('wss://camera-stream.tk:8001');

async function findPort (ctx) {
    var port = await getPort();
    ctx.body = {port: port.toString()};
}

async function createProxy (ctx) {
	const box = ctx.params.box_id;
	const camera = ctx.params.camera_id;
	const portToProxy = await getPort();
	console.log('Available port : %s', portToProxy);
	var request = {msg: 'connexion', boxId: box, cameraId: camera, port: portToProxy}
	//send message to websocket server, to open connection at the box
	ws.on('open', function open(){
		ws.send(JSON.stringify(request));
	});
	//create proxy
    const url = '/'+ box + '/' + camera;
    const p = proxy('camera-stream.tk', {
    	port: portToProxy,
    	https: true,
    	proxyReqPathResolver: (ctx) => { return 'url';}
    });
    console.log('Created Proxy');
    await p(ctx);
}

module.exports = {
	findPort,
	createProxy
}