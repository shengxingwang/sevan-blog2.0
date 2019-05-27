import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reduce from './reducers';

let store = createStore(
    reduce,
    applyMiddleware(thunk)
);
export default store;