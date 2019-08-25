import { createReducer } from '@c/util/reducer';
import { INIT, NEW_USER, USER_DISCONNECT } from './actions';

const roomUsers = createReducer({
    [NEW_USER](state, action) {
        return [...state, action.user.id];
    },
    [USER_DISCONNECT](state, action) {
        return state.filter(userId => userId !== action.id);
    },
});

export default createReducer({
    [INIT](state, action) {
        return state.map(room => ({
            ...room,
            active: true,
            messages: [],
        }));
    },
    [NEW_USER](state, action) {
        return state.map((room, i) => {
            if (i === 0) {
                return {
                    ...room,
                    users: roomUsers(room.users, action),
                };
            }
            return room;
        });
    },
    [USER_DISCONNECT](state, action) {
        return state.map(room => {
            return {
                ...room,
                users: roomUsers(room.users, action),
            };
        });
    },
});
