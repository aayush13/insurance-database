import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer/rootReducer';
let store;
const initialState= {}
const middleware = [thunk]


store = createStore (
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware)) 
    // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
);


export default store;