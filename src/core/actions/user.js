export const SET_USER_PROFILE = 'SET_USER_PROFILE';

export function setUserProfile(userData) {
   return {
      type: SET_USER_PROFILE,
      payload: userData
   }
}