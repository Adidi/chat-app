import React from 'react';
import io from 'socket.io-client';
import { Box } from './root.style';
import App from './app';

const socket = io();

socket.on('connect', () => {
    console.log(`soc connect ${socket.id}`);
});

const Root = () => {
    const v = 'adidi isss in the housedd';
    return (
        <>
            <Box />
            <App />
        </>
    );
};

export default Root;
