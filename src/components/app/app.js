import React, { useEffect } from 'react';
import randomstring from 'randomstring';
import { useSocket, useActions, useStore, useActionsNotify } from '@c/hooks';
import Layout from './layout';

const App = () => {
    const { on, emit } = useSocket();
    const actions = useActions();
    const { joinRoomAndNotify } = useActionsNotify();
    const [state] = useStore();
    const { me } = state;
    const { init } = actions;

    console.log(state);

    useEffect(() => {
        emit('init', randomstring.generate(7), data => {
            const { me, rooms } = data;
            const roomGeneral = rooms[0];

            init(data);
            // join general room from client!
            joinRoomAndNotify(me, roomGeneral.id);
        });

        // listen to all chat events and trigger action dispatch
        // that has the same arguments of course as the callback
        for (const eventName of [
            'newUser',
            'joinRoom',
            'message',
            'leaveRoom',
            'userDisconnect',
            'startPrivateChat'
        ]) {
            on(eventName, actions[eventName]);
        }
    }, []);

    if (!me) {
        return null;
    }

    return <Layout />;
};

export default App;
