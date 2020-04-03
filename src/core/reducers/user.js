import { SET_USER_PROFILE } from '../actions/user'

export const userReducer = (state, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                user: action.payload
            };  
        default:
            return state;
    }
};