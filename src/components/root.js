import React, { useReducer } from 'react';
import reducer, { initialState } from '@c/reducers';
import StateContext from './context';
import App from './app';

const Root = () => {
    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            <App />
        </StateContext.Provider>
    );
};

export default Root;
