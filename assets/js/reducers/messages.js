import {CHAT_MESSAGE_RECEIVED} from '../actions/messages';

const initialState = {
    items: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHAT_MESSAGE_RECEIVED:
            return {
                ...state,
                items: [
                    ...state.items,
                    action.payload,
                ],
            };
        default:
            return state;
    }
};
