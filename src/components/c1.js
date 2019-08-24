import React, { useState, useEffect } from 'react';
import { useSocket } from '@c/hooks';

const Comp1 = ({ idr }) => {
    const [str, setStr] = useState('init value');
    const on = useSocket();

    useEffect(() => {
        on('message', str => {
            setStr(str);
        });
    }, []);

    return (
        <div>
            {idr} {str}
        </div>
    );
};

export default Comp1;
