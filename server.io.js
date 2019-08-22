import http from 'http';
import socketIO from 'socket.io';

export default app => {
    const server = http.Server(app);
    const io = socketIO(server);

    io.on('connection', socket => {
        console.log(`${socket.id} connected`);
        socket.join('room 237', () => {
            let rooms = Object.keys(socket.rooms);
            console.log(rooms); // [ <socket.id>, 'room 237' ]
        });
    });

    return server;
};
