import {SET_CURRENT_USER} from '../actions/user';

const initialState = {
    email: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {...state, email: action.payload.email};
        default: return state;
    }
}
