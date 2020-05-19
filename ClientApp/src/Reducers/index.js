import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import connectedUsersReducer from './connectedUsersReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    connectedUsers: connectedUsersReducer,
});

export default rootReducer;