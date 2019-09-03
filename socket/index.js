import {
    getInitClientData,
    newUser,
    joinRoom,
    leaveRoom,
    deleteUser,
    getUser,
    addRoom
} from './data';

const leaveRoomAndNotify = (socket, roomId) => {
    leaveRoom(socket.id, roomId);
    // notify to all about leave room except sender
    socket.broadcast.emit('leaveRoom', socket.id, roomId);
};

export default (io, socket) => {
    console.log(`${socket.id} connected...`);

    socket.on('init', (name, callback) => {
        const me = newUser(socket.id, name);

        socket.broadcast.emit('newUser', me.id);

        console.log(getInitClientData(me.id));

        callback(getInitClientData(me.id));
    });

    socket.on('message', (roomId, msg) => {
        // notify all in that room about new message except sender
        socket.to(roomId).send(socket.id, roomId, msg);
    });

    socket.on('joinRoom', roomId => {
        socket.join(roomId);
        joinRoom(socket.id, roomId);

        // notify to all about join room except sender
        socket.broadcast.emit('joinRoom', socket.id, roomId);
    });

    socket.on('leaveRoom', roomId => {
        socket.leave(roomId);
        leaveRoomAndNotify(socket, roomId);
    });

    socket.on('startPrivateChat', withUserId => {
        const me = getUser(socket.id);
        const withUser = getUser(withUserId);
        const privateRoom = addRoom('', true);
        privateRoom.users.push(me.id, withUser.id);

        socket.join(privateRoom.id);
        io.sockets.sockets[withUser.id].join(privateRoom.id);

        const clientRoom = {
            ...privateRoom,
            messages: [],
            active: true
        };
        socket.emit('startPrivateChat', me.id, {
            ...clientRoom,
            name: `Private - ${withUser.name}`
        });
        socket.to(withUser.id).emit('startPrivateChat', me.id, {
            ...clientRoom,
            name: `Private - ${me.name}`
        });
    });

    socket.on('disconnect', () => {
        const user = getUser(socket.id);
        if (user) {
            Object.keys(user.rooms).forEach(roomId => {
                leaveRoomAndNotify(socket, roomId);
            });
        }

        deleteUser(socket.id);

        // notify to all about disconnect user except sender
        socket.broadcast.emit('userDisconnect', socket.id);
        console.log(`${socket.id} disconnected...`);
    });
};
