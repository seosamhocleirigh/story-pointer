import { UPDATE_CONNECTED_USER, SHOW_VOTES_ALL_USERS, CLEAR_VOTES_ALL_USERS } from '../Actions/actionTypes';

export const initialState = {
    users: [],
    showVotes: false,
    clearVotes: false,
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CONNECTED_USER:
            return { ...state, users: action.payload };
        case SHOW_VOTES_ALL_USERS:
            return { ...state, showVotes: true };
        case CLEAR_VOTES_ALL_USERS:
            return { ...state, showVotes: false };
        default:
            return state;
    }
}