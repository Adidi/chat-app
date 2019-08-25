import http from 'http';
import socketIO from 'socket.io';
import initialize from './socket';

export default app => {
    const server = http.Server(app);
    const io = socketIO(server);

    io.on('connection', socket => {
        initialize(io, socket);
    });

    return server;
};
