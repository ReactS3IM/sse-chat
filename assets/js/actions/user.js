export const SET_CURRENT_USER = 'user.set_current';
export const setCurrentUser = email => ({type: SET_CURRENT_USER, payload: {email}});
