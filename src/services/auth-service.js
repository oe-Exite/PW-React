import React from 'react';
import { loginUser, registerUser, bearerToken } from '../core/api-service'

const { createContext, useContext } = React;

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
    console.log('AuthProvider init', props);
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

const login = (body) => {
    return loginUser(body).then((res) => {
        console.log('login res', res);
        localStorage[bearerToken] = res.id_token;
    })
    .catch(error => console.log('error:', error));
};

const register = (body) => {
    registerUser(body).then((res) => {
        console.log('register res', res);
        localStorage[bearerToken] = res.id_token;
    })
    .catch(error => console.log('error:', error));
};