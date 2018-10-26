const getPort = require('get-port');
const http = require('http');
const proxy = require('koa-better-http-proxy');
const fs = require('fs');

async function findPort (ctx) {
    var port = await getPort();
    ctx.body = {port: port.toString()};
}

async function createProxy (ctx) {
	const portToProxy = ctx.request.body.port;
	const box = ctx.request.body.box;
	const camera = ctx.request.body.camera;
    const url = '/'+ box + '/' + camera;
    proxy('camera-stream.tk', {
    	port: portToProxy,
    	https: true,
    	proxyReqPathResolver: (ctx) => { return url;}
    });
    console.log('Created Proxy');
    ctx.body = {url: url};
}

module.exports = {
	findPort,
	createProxy
}