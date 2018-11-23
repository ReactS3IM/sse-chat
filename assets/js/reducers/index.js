import {combineReducers} from 'redux';
import messages from './messages';
import user from './user';


export default combineReducers({
    chat: combineReducers({
        messages,
    }),
    user
});
