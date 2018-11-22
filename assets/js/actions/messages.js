export const CHAT_MESSAGE_RECEIVED = 'chat_message.received';
export const chatMessageReceived = message => ({type: CHAT_MESSAGE_RECEIVED, payload: JSON.parse(message.data)});

export const CHAT_MESSAGE_SEND = 'chat_message.send';
export const CHAT_MESSAGE_SENT = 'chat_message.sent';
export const CHAT_MESSAGE_SEND_ERROR = 'chat_message.send_error';
export const sendChatMessage = (author, message) => async dispatch => {
    dispatch({type: CHAT_MESSAGE_SEND});
    try {
        await fetch('http://chat.1z1.fr/api/chat_message/send', {
            method:  'POST',
            headers: {
                'Accept':       'application/ld+json',
                'Content-Type': 'application/ld+json',
            },
            body:    JSON.stringify({author, message}),
        });

        dispatch({type: CHAT_MESSAGE_SENT});
    } catch (error) {
        dispatch({type: CHAT_MESSAGE_SEND_ERROR, error});
    }
};
