import {combineReducers} from 'redux';
import editReducer from './editReducer';

export default combineReducers({
    edit : editReducer 
});