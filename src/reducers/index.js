import { createReducer } from '@c/util/reducer';
import {
    INIT,
    NEW_USER,
    USER_DISCONNECT,
    CHANGE_ROOM,
    MESSAGE,
    JOIN_ROOM,
    LEAVE_ROOM,
    START_PRIVATE_CHAT
} from './actions';
import roomsReducer from './rooms';
import usersReducer from './users';

export const initialState = {
    currentRoom: null,
    userId: null,
    users: {},
    rooms: {
        map: {},
        ids: []
    }
};

export default createReducer({
    [INIT](state, action) {
        const { userId, users, rooms } = action.data;
        return {
            userId,
            users,
            currentRoom: rooms.ids[0],
            rooms: roomsReducer(rooms, action)
        };
    },
    [NEW_USER](state, action) {
        return {
            ...state,
            users: usersReducer(state.users, action)
        };
    },
    [USER_DISCONNECT](state, action) {
        return {
            ...state,
            users: usersReducer(state.users, action)
        };
    },
    [CHANGE_ROOM](state, action) {
        return {
            ...state,
            currentRoom: action.id
        };
    },
    [MESSAGE](state, action) {
        return {
            ...state,
            rooms: roomsReducer(state.rooms, action)
        };
    },
    [JOIN_ROOM](state, action) {
        action.user = state.users[action.userId];
        action.currentUser = action.userId === state.userId;
        return {
            ...state,
            currentRoom: action.currentUser ? action.roomId : state.currentRoom,
            rooms: roomsReducer(state.rooms, action)
        };
    },
    [LEAVE_ROOM](state, action) {
        action.currentUser = action.userId === state.userId;
        return {
            ...state,
            // check if the room we are leaving is the one that is current
            currentRoom:
                action.currentUser && action.roomId === state.currentRoom
                    ? state.rooms[0].id
                    : state.currentRoom,
            rooms: roomsReducer(state.rooms, action)
        };
    },
    [START_PRIVATE_CHAT](state, action) {
        return {
            ...state,
            // if i am the user started the private chat its need to be the current room immediately
            currentRoom:
                action.startedUserId === state.me.id
                    ? action.room.id
                    : state.currentRoom,
            rooms: roomsReducer(state.rooms, action)
        };
    }
});
