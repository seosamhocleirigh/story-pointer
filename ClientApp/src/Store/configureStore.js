import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger'
import { signalRWebsocketMiddleware } from '../Middleware/signalRWebSocket';
//import thunkMiddleware from 'redux-thunk';
//import loggerMiddleware from './middleware/logger';
import { HubConnectionBuilder } from '@microsoft/signalr';
import rootReducer from '../Reducers/';

export default function configureStore(preloadedState) {
    //const middlewares = [loggerMiddleware, thunkMiddleware]
    //const middlewareEnhancer = applyMiddleware(...middlewares)

    //const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
    //const composedEnhancers = compose(...enhancers)

    //const store = createStore(rootReducer, preloadedState, composedEnhancers)

    const hubConnection = new HubConnectionBuilder().withUrl('/vote').build();
    const signalRMiddleware = signalRWebsocketMiddleware(hubConnection);

    const store = createStore(rootReducer, applyMiddleware(logger, signalRMiddleware));
    //const store = createStore(rootReducer, applyMiddleware(logger));

    return store
}