"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app/app");
var debug = require("debug");
var http = require("http");
debug('express:server');
var httpPort = normalizePort(process.env.PORT || 3000);
app_1.default.set('port', httpPort);
var httpServer = http.createServer(app_1.default);
httpServer.listen(httpPort);
httpServer.on('error', onError);
httpServer.on('listening', onListening);
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof httpPort === 'string' ? 'Pipe ' + httpPort : 'Port ' + httpPort;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = httpServer.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
//# sourceMappingURL=index.js.map