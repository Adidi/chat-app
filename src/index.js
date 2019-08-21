import React from 'react';
import ReactDOM from 'react-dom';

const Root = () => {
    const v = 'This is react';
    return <div>{v}</div>;
};

ReactDOM.render(<Root />, document.getElementById('root'));
