import { 
    getUserinfo as userRequest, 
    getTransactions as transactionsRequest, 
    bearerToken 
} from '../core/api-service';
import { setUserProfile } from '../core/actions/user'

export const getUserinfo = (dispatch) => {
    return userRequest().then((res) => {
        console.log('userRequest', res);
        dispatch(setUserProfile(res.data.user_info_token));
    });
}

