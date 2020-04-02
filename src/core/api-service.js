import axios from 'axios'

const baseUrl = 'http://193.124.114.46:3001';

export const bearerToken = 'id_token';

export const loginUser = (body) => {
    return axios.post(`${baseUrl}/sessions/create`, body);
};
  
export const registerUser = (body) => {
    return axios.post(`${baseUrl}/users`, body);
};

export const getUserinfo = () => {
    return axios.get(`${baseUrl}/api/protected/user-info`, authConfig());
};

export const getTransactions = () => {
    return axios.get(`${baseUrl}/api/protected/transactions`, authConfig());
};

const authConfig = () => {
    const token = localStorage[bearerToken];
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return config;
}