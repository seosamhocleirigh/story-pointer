import {
    UPDATE_CONNECTED_USER,
    SIGR_SET_USER_NAME,
    SIGR_CAST_VOTE,
    SIGR_CLEAR_VOTES,
    SIGR_SHOW_VOTES,
    SIGR_CREATE_GROUP,
    GROUPS_LIST_UPDATE,
    SIGR_LIST_GROUPS
} from '../Actions/actionTypes';

export const signalRWebsocketMiddleware = (hubConnection) => {
    return storeAPI => {

        hubConnection
            .start()
            .then(() => console.log('Middleware connection started!'))
            .catch(err => console.log('Error while establishing connection :('));

        hubConnection.on("updateConnectedUsers", (connectedUsers) => {
            storeAPI.dispatch({
                type: UPDATE_CONNECTED_USER,
                payload: connectedUsers
            });
        });

        hubConnection.on("groupsListUpdate", (groupsList) => {
            storeAPI.dispatch({
                type: GROUPS_LIST_UPDATE,
                payload: groupsList
            });
        });

        return next => action => {
            switch (action.type) {
                case SIGR_LIST_GROUPS:
                    hubConnection.invoke('listGroups')
                        .catch(err => console.error(err));
                    return;

                case SIGR_CREATE_GROUP:
                    hubConnection.invoke('addToGroup', action.payload)
                        .catch(err => console.error(err));
                    return;

                case SIGR_SET_USER_NAME:
                    hubConnection.invoke('setUserName', action.payload)
                        .catch(err => console.error(err));
                    return;

                case SIGR_CAST_VOTE:
                    hubConnection
                        .invoke('castVote', action.payload)
                        .catch(err => console.error(err));
                    return;

                case SIGR_SHOW_VOTES:
                    hubConnection
                        .invoke('showVotes')
                        .catch(err => console.error(err));
                    return;

                case SIGR_CLEAR_VOTES:
                    hubConnection
                        .invoke('clearVotes')
                        .catch(err => console.error(err));
                    return;

                default:
                    break;
            }

            return next(action);
        }
    }
}