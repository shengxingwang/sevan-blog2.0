import { combineReducers } from 'redux';
import { newsData } from './newReducer';
import { ArtListData } from './artReducer';
import { ArtData } from './artDetReducer';
import { TagListData } from './tagReducer';
import { dateData } from './guidanReducer';

export default combineReducers({
    newsData,
    ArtListData,
    ArtData,
    TagListData,
    dateData
})