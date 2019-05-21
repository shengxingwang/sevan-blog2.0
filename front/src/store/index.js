import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reduce from './reducers'
// import * as about from './reducers/aboutReducer';
// console.log(about);

let store = createStore(
    reduce,
    applyMiddleware(thunk)
);
export default store;