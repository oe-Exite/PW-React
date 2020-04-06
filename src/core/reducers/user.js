import { 
    SET_USER_PROFILE, 
    SET_USER_TRANSACTIONS,
    ADD_USER_TRANSACTION
} from '../actions/user'

export const userReducer = (state, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                user: action.payload
            };
        case SET_USER_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload
            };
        case ADD_USER_TRANSACTION:
            const newTransactions = [...state.transactions]
            newTransactions.push(action.payload);
            return {
                ...state,
                transactions: newTransactions
            };
        default:
            return state;
    }
};