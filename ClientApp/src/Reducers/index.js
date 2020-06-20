import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import connectedUsersReducer from './connectedUsersReducer';
import groupsReducer from './groupsReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    connectedUsers: connectedUsersReducer,
    groups: groupsReducer,
});

export default rootReducer;