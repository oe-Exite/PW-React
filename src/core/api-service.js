import axios from 'axios'

const baseUrl = 'http://193.124.114.46:3001';

export const bearerToken = 'id_token';

export class ApiService {

    static loginUser = (body) =>
        axios.post(`${baseUrl}/sessions/create`, body);

    static registerUser = (body) =>
        axios.post(`${baseUrl}/users`, body);

    static getUserinfo = () =>
        axios.get(`${baseUrl}/api/protected/user-info`, authConfig());
    
    static getUserTransactions = () =>
        axios.get(`${baseUrl}/api/protected/transactions`, authConfig());

    static createTransaction = (body) =>
        axios.post(`${baseUrl}/api/protected/transactions`, body, authConfig());
    
    static usersList = (body) =>
        axios.post(`${baseUrl}/api/protected/users/list`, body, authConfig());
}

const authConfig = () => {
    const token = localStorage[bearerToken];
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return config;
}