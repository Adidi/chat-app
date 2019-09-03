import shortid from 'shortid';
import { createReducer } from '@c/util/reducer';
import {
    INIT,
    MESSAGE,
    JOIN_ROOM,
    LEAVE_ROOM,
    START_PRIVATE_CHAT
} from './actions';

const createMessage = (msg, from) => ({ id: shortid.generate(), msg, from });

const joinLeaveCreateMessages = (currentUser, room, msg, defaultValue) => {
    const notify = !currentUser && room.active;
    return notify ? [...room.messages, createMessage(msg)] : defaultValue;
};

export default createReducer({
    [INIT](state, action) {
        return {
            ...state,
            map: state.ids.reduce((map, id, i) => {
                map[id] = {
                    ...state.map[id],
                    active: i === 0,
                    messages: []
                };
                return map;
            }, {})
        };
    },
    [MESSAGE](state, action) {
        return state.map(room => {
            if (action.toRoomId === room.id) {
                return {
                    ...room,
                    messages: [
                        ...room.messages,
                        createMessage(action.msg, action.fromUserId)
                    ]
                };
            }
            return room;
        });
    },
    [JOIN_ROOM](state, action) {
        return {
            ...state,
            map: state.ids.reduce((map, id) => {
                const room = state.map[id];
                if (room.id === action.roomId) {
                    map[id] = {
                        ...room,
                        active: action.currentUser ? true : room.active,
                        users: [...room.users, action.userId],
                        messages: joinLeaveCreateMessages(
                            action.currentUser,
                            room,
                            `${action.user.name} join the room.`,
                            room.messages
                        )
                    };
                } else {
                    map[id] = room;
                }

                return map;
            }, {})
        };
    },
    [LEAVE_ROOM](state, action) {
        return state
            .map(room => {
                if (room.id === action.roomId) {
                    return {
                        ...room,
                        active: action.currentUser ? false : room.active,
                        users: room.users.filter(uid => uid !== action.user.id),
                        messages: joinLeaveCreateMessages(
                            action.currentUser,
                            room,
                            `${action.user.name} left the room.`,
                            []
                        )
                    };
                }

                return room;
            })
            .filter(room => {
                // delete if its private room and me is leaving it
                if (
                    action.currentUser &&
                    room.id === action.roomId &&
                    room.isPrivate
                ) {
                    return false;
                }
                return true;
            });
    },
    [START_PRIVATE_CHAT](state, action) {
        return [...state, action.room];
    }
});
