import { useCallback } from 'react';
import ldReduce from 'lodash/reduce';
import useState from './use-state';
import * as actions from '@c/reducers/actions';

const useActions = () => {
    const [, dispatch] = useState();

    // make of all the actions execute functions using dispatch
    return ldReduce(
        actions,
        (acc, curr, key) => {
            if (typeof curr === 'function') {
                acc[key] = useCallback((...args) => dispatch(curr(...args)));
            }

            return acc;
        },
        {},
    );
};

export default useActions;
