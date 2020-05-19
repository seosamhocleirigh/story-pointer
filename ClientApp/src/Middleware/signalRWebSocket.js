import { UPDATE_CONNECTED_USER, SET_USER_NAME, CAST_VOTE, CLEAR_VOTES } from '../Actions/actionTypes';

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

                case CLEAR_VOTES:
                    hubConnection
                        .invoke('clearVote')
                        .catch(err => console.error(err));

                    return;

                default:
                    break;
            }

            return next(action);
        }
    }
}