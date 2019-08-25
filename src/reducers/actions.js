export const INIT = 'INIT';
export const NEW_USER = 'NEW_USER';
export const USER_DISCONNECT = 'USER_DISCONNECT';

export const init = data => ({ type: INIT, data });
export const newUser = user => ({ type: NEW_USER, user });
export const userDisconnect = id => ({ type: USER_DISCONNECT, id });
