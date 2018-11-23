import {combineReducers} from 'redux';
import messages from './messages';


export default combineReducers({
    chat: combineReducers({
        messages,
    }),


});
