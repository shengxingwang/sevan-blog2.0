import {combineReducers} from 'redux';
import article from './artList';
import tagData from './taglist';
import layData from './layout';
// import {commData} from './commentReducer';
export default combineReducers({
    article,
    tagData,
    layData
})