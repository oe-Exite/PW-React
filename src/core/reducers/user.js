export const userReducer = (state, action) => {
    switch (action.type) {
        case 'changeUser':
            return {
                ...state,
                user: action.newUser
            };  
        default:
            return state;
    }
};