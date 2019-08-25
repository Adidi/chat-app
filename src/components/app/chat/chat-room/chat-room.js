import React, { useState, useEffect } from 'react';
import { useSocket } from '@c/hooks';

const ChatRoom = ({ room }) => {
    const [messages, setMessages] = useState([]);
    const on = useSocket();

    useEffect(() => {
        on('message', msg => {
            setMessages([...messages, msg]);
        });
    }, []);

    return messages.map(message => <div>{message}</div>);
};

export default ChatRoom;
