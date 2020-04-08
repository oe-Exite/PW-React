import { ApiService } from '../core/api-service';
import { 
    setUserProfile, 
    setUserTransactions, 
    addUserTransaction,
    changeUserBalance
} from '../core/actions/user'

export default class UserService {

    static getUserinfo(dispatch) {
        return ApiService.getUserinfo().then((res) => {
            dispatch(setUserProfile(res.data.user_info_token));
        });
    }

    static getUserTransactions(dispatch) {
        return ApiService.getUserTransactions().then((res) => {
            dispatch(setUserTransactions(res.data.trans_token));
        });
    }

    static createTransaction(body, dispatch) {
        return ApiService.createTransaction(body).then((res) => {
            dispatch(addUserTransaction(res.data.trans_token));
        });
    }

    static changeUserBalance(amount, dispatch) {
        dispatch(changeUserBalance(amount));
    }

}

