import React, { useEffect } from 'react';
import randomstring from 'randomstring';
import { useSocket, useActions, useStore, useActionsNotify } from '@c/hooks';
import Layout from './layout';

const App = () => {
    const { on, emit } = useSocket();
    const {
        init,
        newUser,
        userDisconnect,
        joinRoom,
        sendMessage,
        leaveRoom,
    } = useActions();
    const { joinRoomAndNotify } = useActionsNotify();
    const [state] = useStore();
    const { me } = state;

    useEffect(() => {
        emit('init', randomstring.generate(7), data => {
            const { me, rooms } = data;
            const roomGeneral = rooms[0];

            init(data);
            // join general room from client!
            joinRoomAndNotify(me, roomGeneral.id);
        });

        on('startPrivateChat', data => {
            console.log('startPrivateChat', data);
        });

        on('joinPrivateChat', data => {
            console.log('joinPrivateChat', data);
        });

        on('newUser', newUser);

        on('joinRoom', joinRoom);

        on('message', sendMessage);

        on('leaveRoom', leaveRoom);

        on('userDisconnect', userDisconnect);
    }, []);

    if (!me) {
        return null;
    }

    return <Layout />;
};

export default App;
