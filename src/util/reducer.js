export const createReducer = (handlers = {}) => (state, action) => {
    if (handlers[action.type]) {
        return handlers[action.type](state, action);
    }
    return state;
};
