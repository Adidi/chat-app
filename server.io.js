import http from 'http';
import socketIO from 'socket.io';

export default app => {
    const server = http.Server(app);
    const io = socketIO(server);

    io.on('connection', socket => {
        console.log(`${socket.id} connected`);
        io.send(`hello to ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnected...`);
        });

        socket.on('pp', () => {
            io.send(`Send from ${socket.id} ${Date.now()}`);
        });
    });

    return server;
};
