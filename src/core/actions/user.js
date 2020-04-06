export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const SET_USER_TRANSACTIONS = 'SET_USER_TRANSACTIONS';
export const ADD_USER_TRANSACTION = 'ADD_USER_TRANSACTION';

export function setUserProfile(userData) {
   return {
      type: SET_USER_PROFILE,
      payload: userData
   }
}

export function setUserTransactions(transactions) {
   return {
      type: SET_USER_TRANSACTIONS,
      payload: transactions
   }
}

export function addUserTransaction(transaction) {
   return {
      type: ADD_USER_TRANSACTION,
      payload: transaction
   }
}