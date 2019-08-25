import shortid from 'shortid';

const createRoom = name => {
    const id = shortid.generate();
    return { id, name, users: [] };
};

const createUser = (id, name) => ({ id, name });

const users = {};
const rooms = [createRoom('General')];

const getRoom = id => rooms.find(room => room.id === id);

export const newRoom = (name, id) => {
    const room = createRoom(name, id);
    rooms.push(room);
    return room;
};

export const newUser = (id, name) => {
    const user = createUser(id, name);
    users[user.id] = user;
    return user;
};

export const addUserToRoom = (userId, roomId) => {
    const room = getRoom(roomId);
    room.users.push(userId);
};

export const deleteUser = userId => {
    delete users[userId];
    for (const room of rooms) {
        room.users = room.users.filter(uid => uid !== userId);
    }
};

export const getData = () => ({
    users,
    rooms,
});
