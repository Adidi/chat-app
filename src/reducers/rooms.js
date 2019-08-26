import shortid from 'shortid';
import { createReducer } from '@c/util/reducer';
import { INIT, SEND_MESSAGE, JOIN_ROOM, LEAVE_ROOM } from './actions';

const createMessage = (msg, from) => ({ id: shortid.generate(), msg, from });

const joinLeaveCreateMessages = (currentUser, room, msg, defaultValue) => {
    const notify = !currentUser && room.active;
    return notify ? [...room.messages, createMessage(msg)] : defaultValue;
};

export default createReducer({
    [INIT](state, action) {
        return state.map((room, i) => ({
            ...room,
            active: i === 0,
            messages: [],
        }));
    },
    [SEND_MESSAGE](state, action) {
        return state.map(room => {
            if (action.toRoomId === room.id) {
                return {
                    ...room,
                    messages: [
                        ...room.messages,
                        createMessage(action.msg, action.fromUserId),
                    ],
                };
            }
            return room;
        });
    },
    [JOIN_ROOM](state, action) {
        return state.map(room => {
            if (room.id === action.roomId) {
                return {
                    ...room,
                    active: action.currentUser ? true : room.active,
                    users: [...room.users, action.user.id],
                    messages: joinLeaveCreateMessages(
                        action.currentUser,
                        room,
                        `${action.user.name} join the room.`,
                        room.messages,
                    ),
                };
            }

            return room;
        });
    },
    [LEAVE_ROOM](state, action) {
        return state.map(room => {
            if (room.id === action.roomId) {
                return {
                    ...room,
                    active: action.currentUser ? false : room.active,
                    users: room.users.filter(uid => uid !== action.user.id),
                    messages: joinLeaveCreateMessages(
                        action.currentUser,
                        room,
                        `${action.user.name} left the room.`,
                        [],
                    ),
                };
            }

            return room;
        });
    },
});
