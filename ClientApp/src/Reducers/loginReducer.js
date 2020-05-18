import { USER_LOGIN } from '../Actions/actionTypes';
import * as actions from '../Actions/loginActions';

export const initialState = {
    userName: null
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return { ...state, userName: action.payload };
        default:
            return state;
    }
}