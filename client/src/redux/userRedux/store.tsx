// @ts-nocheck
import { createStore } from 'redux';
import { user as modelUser } from "../../models/user";

const todos = (state = {} as modelUser, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...action.user
            };
        default:
            return state;
    }
};

export default createStore(todos);