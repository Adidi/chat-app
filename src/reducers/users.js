import { createReducer } from '@c/util/reducer';
import { NEW_USER, USER_DISCONNECT } from './actions';

export default createReducer({
    [NEW_USER](state, action) {
        return {
            ...state,
            [action.user.id]: action.user,
        };
    },
    [USER_DISCONNECT](state, action) {
        const { [action.id]: user, ...restUsers } = state;
        return restUsers;
    },
});
