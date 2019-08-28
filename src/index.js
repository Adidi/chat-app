import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import { initSocket } from './socket';

initSocket();

ReactDOM.render(<Root />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
