import { createReducer } from '@c/util/reducer';
import { INIT, NEW_USER, USER_DISCONNECT } from './actions';
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
            currentRoom: rooms[0].id,
            me,
            users,
            rooms: roomsReducer(rooms, action),
        };
    },
    [NEW_USER](state, action) {
        const { users, rooms } = state;
        return {
            ...state,
            users: usersReducer(users, action),
            rooms: roomsReducer(rooms, action),
        };
    },
    [USER_DISCONNECT](state, action) {
        const { users, rooms } = state;
        return {
            ...state,
            users: usersReducer(users, action),
            rooms: roomsReducer(rooms, action),
        };
    },
});
