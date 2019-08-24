import { useState, useEffect } from 'react';
import getSocket from '@c/util/socket';

const useSocket = () => {
    const [events, setEvents] = useState({});
    const socket = getSocket();

    useEffect(() => {
        // unsubscribe from the events
        return () => {
            for (const eventName in events) {
                const eventCallback = events[eventName];
                socket.off(eventName, eventCallback);
            }
        };
    }, [events]);

    const on = (eventName, eventCallback) => {
        setEvents({
            ...events,
            [eventName]: eventCallback,
        });
        socket.on(eventName, eventCallback);
    };

    return on;
};

export default useSocket;
