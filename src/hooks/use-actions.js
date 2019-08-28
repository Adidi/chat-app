import { useCallback } from 'react';
import ldReduce from 'lodash/reduce';
import * as actions from '@c/reducers/actions';
import useStore from './use-store';

const useActions = () => {
    const [, dispatch] = useStore();

    // make of all the actions execute functions using dispatch
    return ldReduce(
        actions,
        (acc, curr, key) => {
            if (typeof curr === 'function') {
                acc[key] = useCallback((...args) => dispatch(curr(...args)));
            }

            return acc;
        },
        {}
    );
};

export default useActions;
