import shortid from 'shortid';

const data = {
    users: {},
    rooms: {
        map: {},
        ids: []
    }
};

const createRoom = (name, isPrivate = false) => {
    const id = shortid.generate();
    return { id, name, users: [], isPrivate };
};

// user id is the socket id
const createUser = (id, name) => ({ id, name, rooms: {} });

export const getRoom = id => data.rooms.map[id];
export const getUser = id => data.users[id];

const deleteRoom = id => {
    delete data.rooms.map[id];
};

export const newUser = (id, name) => {
    const user = createUser(id, name);
    data.users[user.id] = user;
    return user;
};

export const joinRoom = (userId, roomId) => {
    const user = getUser(userId);
    const room = getRoom(roomId);
    room.users.push(userId);
    // add to rooms array for easy access when deleting user
    user.rooms[roomId] = true;
};

export const leaveRoom = (userId, roomId) => {
    const user = getUser(userId);
    const room = getRoom(roomId);
    room.users = room.users.filter(uid => uid !== userId);
    delete user.rooms[roomId];

    if (room.isPrivate && !room.users.length) {
        deleteRoom(room.id);
    }
};

export const deleteUser = userId => {
    delete data.users[userId];
};

export const addRoom = (name, isPrivate = false) => {
    const room = createRoom(name, isPrivate);
    data.rooms.map[room.id] = room;
    data.rooms.ids.push(room.id);
    return room;
};

export const getData = () => data;

export const getInitClientData = userId => {
    const { rooms, users } = data;
    const publicRoomsIds = rooms.ids.filter(id => !rooms.map[id].isPrivate);
    return {
        userId,
        users,
        // return to the user only the public rooms:
        rooms: {
            map: publicRoomsIds.reduce((map, id) => {
                map[id] = rooms.map[id];
                return map;
            }, {}),
            ids: publicRoomsIds
        }
    };
};

addRoom('General');
addRoom('גייז שמנמנים');
addRoom('סטרייט בסטרייט');
