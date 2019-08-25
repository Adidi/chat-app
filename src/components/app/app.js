import React, { useReducer, useEffect } from 'react';
import randomstring from 'randomstring';
import Layout from './layout';
import { useSocket, useActions } from '@c/hooks';

const App = () => {
    const [on, emit] = useSocket();
    const { init, newUser, userDisconnect } = useActions();

    useEffect(() => {
        emit('init', randomstring.generate(7), init);

        on('newUser', newUser);

        on('userDisconnect', userDisconnect);
    }, []);

    return <Layout />;
};

export default App;
