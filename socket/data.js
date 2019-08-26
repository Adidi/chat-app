import shortid from 'shortid';

export const createRoom = name => {
    const id = shortid.generate();
    return { id, name, users: [] };
};

const createUser = (id, name) => ({ id, name, rooms: {} });

const users = {};
const rooms = [
    createRoom('General'),
    createRoom('גייז שמנמנים'),
    createRoom('סטרייט בסטרייט'),
];

const getRoom = id => rooms.find(room => room.id === id);

export const newUser = (id, name) => {
    const user = createUser(id, name);
    users[user.id] = user;
    return user;
};

export const addUserToRoom = (userId, roomId) => {
    const user = users[userId];
    const room = getRoom(roomId);
    room.users.push(userId);
    // add to rooms array for easy access when deleting user
    user.rooms[roomId] = true;
};

export const removeUserFromRoom = (userId, roomId) => {
    const user = users[userId];
    const room = getRoom(roomId);
    room.users = room.users.filter(uid => uid !== userId);
    delete user.rooms[roomId];
};

export const deleteUser = userId => {
    delete users[userId];
};

export const getUser = userId => users[userId];

export const getData = () => ({
    users,
    rooms,
});
