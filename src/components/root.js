import React, { useState } from 'react';
import { Box } from './root.style';
import App from './app';
import { Button } from 'antd';
import Comp1 from './c1';
import getSocket from '@c/util/socket';

const Root = () => {
    const [show, setShow] = useState(true);
    const v = 'adidi isss in the housedd';
    return (
        <>
            <Box />

            {show && <Comp1 idr="Comp1" />}
            <Comp1 idr="Comp2" />
            <Button
                onClick={() => {
                    const socket = getSocket();
                    socket.emit('pp', new Date());
                }}
            >
                Adiel
            </Button>
            <Button onClick={() => setShow(false)}>Hide</Button>
        </>
    );
};

export default Root;
