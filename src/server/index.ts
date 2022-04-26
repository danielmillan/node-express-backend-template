#!/usr/bin/env node

/**
 * Module dependencies.
 */
import debugLib from 'debug';
import http from 'http';
import app from '../app';
import config from '../config';

const port = normalizePort(config.port);
const debug = debugLib('app:server');

/**
 * Get port and store in Express.
 */
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */
export function normalizePort(val: string) {
    const nPort = parseInt(val, 10);
    if (isNaN(nPort)) {
        // named pipe
        return val;
    }
    if (nPort >= 0) {
        // port number
        return nPort;
    }
    return false;
}

/**
 * Event listener for HTTP server 'error' event.
 */
export function onError(error: any) {
    try {
        if (error.syscall !== 'listen') {
            throw error;
        }
        const bind = typeof port === 'string'
            ? `Pipe ${port}`
            : `Port ${port}`;
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind}  is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server 'listening' event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${(addr as any).port}`;
    debug(`Listening on ${bind}`);
}

export default server;