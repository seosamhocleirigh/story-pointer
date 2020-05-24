import { UPDATE_CONNECTED_USER, SHOW_VOTES, CLEAR_VOTES } from '../Actions/actionTypes';

export const initialState = {
    users: [],
    showVotes: false,
    clearVotes: false, // TODO: remove this, not needed
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CONNECTED_USER:
            return { ...state, users: action.payload.connectedUsers };
        case SHOW_VOTES:
            return { ...state, showVotes: true };
        case CLEAR_VOTES:
            return { ...state, showVotes: false, clearVotes: true };
        default:
            return state;
    }
}