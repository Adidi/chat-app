import { createReducer } from '@c/util/reducer';
import {
    INIT,
    NEW_USER,
    USER_DISCONNECT,
    CHANGE_ROOM,
    SEND_MESSAGE,
    JOIN_ROOM,
    LEAVE_ROOM,
} from './actions';
import roomsReducer from './rooms';
import usersReducer from './users';

export const initialState = {
    currentRoom: null,
    me: null,
    users: {},
    rooms: [],
};

export default createReducer({
    [INIT](state, action) {
        const { me, users, rooms } = action.data;
        return {
            me,
            users,
            currentRoom: rooms[0].id,
            rooms: roomsReducer(rooms, action),
        };
    },
    [NEW_USER](state, action) {
        return {
            ...state,
            users: usersReducer(state.users, action),
        };
    },
    [USER_DISCONNECT](state, action) {
        return {
            ...state,
            users: usersReducer(state.users, action),
        };
    },
    [CHANGE_ROOM](state, action) {
        return {
            ...state,
            currentRoom: action.id,
        };
    },
    [SEND_MESSAGE](state, action) {
        return {
            ...state,
            rooms: roomsReducer(state.rooms, action),
        };
    },
    [JOIN_ROOM](state, action) {
        action.currentUser = action.user.id === state.me.id;
        return {
            ...state,
            currentRoom: action.currentUser ? action.roomId : state.currentRoom,
            rooms: roomsReducer(state.rooms, action),
        };
    },
    [LEAVE_ROOM](state, action) {
        action.currentUser = action.user.id === state.me.id;
        return {
            ...state,
            // check if the room we are leaving is the one that is current
            currentRoom:
                action.currentUser && action.roomId === state.currentRoom
                    ? state.rooms[0].id
                    : state.currentRoom,
            rooms: roomsReducer(state.rooms, action),
        };
    },
});
