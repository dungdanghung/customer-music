// @ts-nocheck
import { createStore } from 'redux';

const Loader = (state = { Loading: false }, action) => {
    switch (action.type) {
        case "on":
            return {
                Loading: true
            }
        case "off":
            return {
                Loading: false
            }
        default:
            return state
    }
};

export default createStore(Loader);