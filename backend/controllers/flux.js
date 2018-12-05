const getPort = require('get-port');
const proxy = require('koa-better-http-proxy');
const WebSocket = require('ws');
const ws = new WebSocket('wss://camera-stream.tk:8001');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getCameras (ctx) {
    const box = ctx.params.box_id;
    var request = {msg: 'getCameras', boxId: box};
    ws.send(JSON.stringify(request));
}

async function destroyConnection (ctx) {
    const box = ctx.params.box_id;
    const camera = ctx.params.camera_id;
    var request = {msg: 'kill', boxId: box, cameraId: camera};
    ws.send(JSON.stringify(request));
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
    //websocket answer for request of box
      //how to wait on a specific answer with websocket and await ? for the moment, use of sleep
    //create proxy
    await sleep(2000);
     	const p = proxy('51.15.227.253', {
     	port: portToProxy,
     	https: true,
     	proxyReqPathResolver: (ctx) => { return '/axis-cgi/mjpg/video.cgi';}
     });
    console.log('Created Proxy');
    await p(ctx);
    //ctx.body = {url: 'http://camera-stream.tk:'+portToProxy+'/axis-cgi/mjpg/video.cgi'}
}

module.exports = {
	getCameras,
    destroyConnection,
    createProxy
}