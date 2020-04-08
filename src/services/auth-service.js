import { ApiService, bearerToken } from '../core/api-service';
import { setUserProfile } from '../core/actions/user'

export default class AuthService {

    static isLoggedIn = () =>
        localStorage[bearerToken]

    static logout = (routerHistory, dispatch) => {
        localStorage.removeItem(bearerToken);
        dispatch(setUserProfile(null));
        routerHistory.push('/login');
    }
    
    static login = (body) => {
        return ApiService.loginUser(body).then((res) => {
            localStorage[bearerToken] = res.data.id_token;
        });
    };
    
    static register = (body) => {
        return ApiService.registerUser(body).then((res) => {
            localStorage[bearerToken] = res.data.id_token;
        });
    };
}