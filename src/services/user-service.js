import { ApiService } from '../core/api-service';
import { setUserProfile, setUserTransactions } from '../core/actions/user'

export default class UserService {

    static getUserinfo(dispatch) {
        return ApiService.getUserinfo().then((res) => {
            console.log('userRequest', res);
            dispatch(setUserProfile(res.data.user_info_token));
        });
    }

    static getUserTransactions(dispatch) {
        return ApiService.getUserTransactions().then((res) => {
            console.log('getUserTransactions', res);
            dispatch(setUserTransactions(res.data.trans_token));
        });
    }

    static createTransaction(body, dispatch) {
        return ApiService.createTransaction(body).then((res) => {
            console.log('createTransaction', res);
            dispatch(setUserTransactions(res.data.trans_token));
        });
    }

}

