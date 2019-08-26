export const INIT = 'INIT';
export const NEW_USER = 'NEW_USER';
export const USER_DISCONNECT = 'USER_DISCONNECT';
export const CHANGE_ROOM = 'CHANGE_ROOM';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const JOIN_ROOM = 'JOIN_ROOM';
export const LEAVE_ROOM = 'LEAVE_ROOM';
export const START_PRIVATE_CHAT = 'START_PRIVATE_CHAT';

export const init = data => ({ type: INIT, data });
export const newUser = user => ({ type: NEW_USER, user });
export const userDisconnect = id => ({ type: USER_DISCONNECT, id });
export const changeRoom = id => ({ type: CHANGE_ROOM, id });
export const sendMessage = (fromUserId, toRoomId, msg) => ({
    type: SEND_MESSAGE,
    fromUserId,
    toRoomId,
    msg,
});
export const joinRoom = (user, roomId) => ({
    type: JOIN_ROOM,
    user,
    roomId,
});
export const leaveRoom = (user, roomId) => ({
    type: LEAVE_ROOM,
    user,
    roomId,
});
export const startPrivateChat = withUser => ({
    type: START_PRIVATE_CHAT,
    withUser,
});
