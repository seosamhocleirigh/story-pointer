import { UPDATE_CONNECTED_USER, SET_USER_NAME, CAST_VOTE, CLEAR_VOTES, CLEAR_VOTES_ALL_USERS, SHOW_VOTES, SHOW_VOTES_ALL_USERS } from '../Actions/actionTypes';

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

        hubConnection.on("showVotesAllUsers", () => {
            console.log('showVotesAllUsers');
            storeAPI.dispatch({
                type: SHOW_VOTES_ALL_USERS,
            });
        });

        hubConnection.on("clearVotesAllUsers", () => {
            console.log('clearVotesAllUsers');
            storeAPI.dispatch({
                type: CLEAR_VOTES_ALL_USERS,
            });
        });

        return next => action => {
            switch (action.type) {
                case SET_USER_NAME:
                    hubConnection.invoke('setUserName', action.payload)
                        .catch(err => console.error(err));
                    return;

                case CAST_VOTE:
                    hubConnection
                        .invoke('castVote', action.payload)
                        .catch(err => console.error(err));
                    return;

                case SHOW_VOTES:
                    hubConnection
                        .invoke('showVotes')
                        .catch(err => console.error(err));

                case CLEAR_VOTES:
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