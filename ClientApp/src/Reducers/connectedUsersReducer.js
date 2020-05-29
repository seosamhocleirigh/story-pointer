import { UPDATE_CONNECTED_USER } from '../Actions/actionTypes';

export default function loginReducer(state = { users: [] }, action) {
    switch (action.type) {
        case UPDATE_CONNECTED_USER:
            return { ...state, users: action.payload.connectedUsers };
        default:
            return state;
    }
}