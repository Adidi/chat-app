export const INIT = 'INIT';
export const NEW_USER = 'NEW_USER';
export const USER_DISCONNECT = 'USER_DISCONNECT';
export const CHANGE_ROOM = 'CHANGE_ROOM';
export const MESSAGE = 'MESSAGE';
export const JOIN_ROOM = 'JOIN_ROOM';
export const LEAVE_ROOM = 'LEAVE_ROOM';
export const START_PRIVATE_CHAT = 'START_PRIVATE_CHAT';

export const init = data => ({ type: INIT, data });
export const newUser = user => ({ type: NEW_USER, user });
export const userDisconnect = id => ({ type: USER_DISCONNECT, id });
export const changeRoom = id => ({ type: CHANGE_ROOM, id });
export const message = (fromUserId, toRoomId, msg) => ({
    type: MESSAGE,
    fromUserId,
    toRoomId,
    msg
});
export const joinRoom = (userId, roomId) => ({
    type: JOIN_ROOM,
    userId,
    roomId
});
export const leaveRoom = (userId, roomId) => ({
    type: LEAVE_ROOM,
    userId,
    roomId
});
export const startPrivateChat = (startedUserId, room) => ({
    type: START_PRIVATE_CHAT,
    startedUserId,
    room
});
