import {
    getData,
    newUser,
    addUserToRoom,
    removeUserFromRoom,
    deleteUser,
    createRoom,
    getUser,
    addRoom
} from './data';

const removeUserFromRoomAndNotify = (socket, roomId) => {
    removeUserFromRoom(socket.id, roomId);
    // notify to all about leave room except sender
    socket.broadcast.emit('leaveRoom', getUser(socket.id), roomId);
};

export default (io, socket) => {
    console.log(`${socket.id} connected...`);

    socket.on('init', (name, callback) => {
        const { rooms, users } = getData();
        const user = newUser(socket.id, name);

        socket.broadcast.emit('newUser', user);

        // return to the user only the public rooms
        const publicRooms = rooms.filter(room => !room.isPrivate);
        callback({
            rooms: publicRooms,
            users,
            me: user
        });
    });

    socket.on('message', (roomId, msg) => {
        // notify all about new message except sender
        socket.to(roomId).send(socket.id, roomId, msg);
    });

    socket.on('joinRoom', roomId => {
        socket.join(roomId);
        addUserToRoom(socket.id, roomId);

        // notify to all about join room except sender
        socket.broadcast.emit('joinRoom', getUser(socket.id), roomId);
    });

    socket.on('leaveRoom', roomId => {
        socket.leave(roomId);
        removeUserFromRoomAndNotify(socket, roomId);

        console.log(getData());
    });

    socket.on('startPrivateChat', withUser => {
        const user = getUser(socket.id);
        const privateRoom = createRoom('', true);
        privateRoom.users.push(withUser.id, user.id);
        addRoom(privateRoom);

        socket.join(privateRoom.id);
        io.sockets.sockets[withUser.id].join(privateRoom.id);

        const clientRoom = {
            ...privateRoom,
            messages: [],
            active: true
        };
        socket.emit('startPrivateChat', user.id, {
            ...clientRoom,
            name: `Private - ${withUser.name}`
        });
        socket.to(withUser.id).emit('startPrivateChat', user.id, {
            ...clientRoom,
            name: `Private - ${user.name}`
        });
    });

    socket.on('disconnect', () => {
        const user = getUser(socket.id);
        if (user) {
            Object.keys(user.rooms).forEach(roomId => {
                removeUserFromRoomAndNotify(socket, roomId);
            });
        }

        deleteUser(socket.id);

        // notify to all about disconnect user except sender
        socket.broadcast.emit('userDisconnect', socket.id);
        console.log(`${socket.id} disconnected...`);
    });
};
