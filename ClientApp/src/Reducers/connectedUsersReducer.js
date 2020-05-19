import { UPDATE_CONNECTED_USER } from '../Actions/actionTypes';

export const initialState = {
    users: [],
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CONNECTED_USER:
            return { ...state, users: action.payload };
        default:
            return state;
    }
}