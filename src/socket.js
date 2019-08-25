import io from 'socket.io-client';

let socket;

export const initSocket = () => {
    socket = io();
};

export default () => socket;
