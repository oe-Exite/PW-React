import React from 'react';
import { ApiService, bearerToken } from '../core/api-service';
import { setUserProfile } from '../core/actions/user'

const { createContext, useContext } = React;

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
    const value = {
        login: props.login || login,
        register: props.register || register,
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const logout = (routerHistory, dispatch) => {
    localStorage.removeItem(bearerToken);
    dispatch(setUserProfile(null));
    routerHistory.push('/login');
}

const login = (body) => {
    return ApiService.loginUser(body).then((res) => {
        localStorage[bearerToken] = res.data.id_token;
    });
};

const register = (body) => {
    return ApiService.registerUser(body).then((res) => {
        localStorage[bearerToken] = res.data.id_token;
    });
};