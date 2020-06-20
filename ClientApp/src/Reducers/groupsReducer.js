import { GROUPS_LIST_UPDATE } from '../Actions/actionTypes';

export default function groupsReducer(state = { groupsList: [] }, action) {
    switch (action.type) {
        case GROUPS_LIST_UPDATE:
            return { ...state, groupsList: action.payload.groupsList };
        default:
            return state;
    }
}