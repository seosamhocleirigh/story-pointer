import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger'
//import thunkMiddleware from 'redux-thunk';
//import loggerMiddleware from './middleware/logger';
import rootReducer from '../Reducers/';

export default function configureStore(preloadedState) {
    //const middlewares = [loggerMiddleware, thunkMiddleware]
    //const middlewareEnhancer = applyMiddleware(...middlewares)

    //const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
    //const composedEnhancers = compose(...enhancers)

    //const store = createStore(rootReducer, preloadedState, composedEnhancers)
    const store = createStore(rootReducer, applyMiddleware(logger));

    return store
}