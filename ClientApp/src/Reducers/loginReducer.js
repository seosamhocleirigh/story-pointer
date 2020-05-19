import { USER_LOGIN } from '../Actions/actionTypes';

export const initialState = {
    userName: ''
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return { ...state, userName: action.payload };
        default:
            return state;
    }
}