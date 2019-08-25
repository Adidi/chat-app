import { getData, newRoom, newUser, addUserToRoom, deleteUser } from './data';

export default (io, socket) => {
    console.log(`${socket.id} connected`);

    socket.on('init', (name, callback) => {
        const { rooms, users } = getData();
        const roomGeneral = rooms[0];
        const user = newUser(socket.id, name);

        // add to general room
        socket.join(roomGeneral.id);
        addUserToRoom(user.id, roomGeneral.id);
        callback({ rooms, users, me: user });

        // notify to all about new user
        socket.broadcast.emit('newUser', user);
    });

    socket.on('disconnect', () => {
        deleteUser(socket.id);

        // notify to all about new user
        socket.broadcast.emit('userDisconnect', socket.id);
        console.log(`${socket.id} disconnected...`);
    });
};
