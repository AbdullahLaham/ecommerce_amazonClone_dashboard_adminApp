import axios from "axios";
import API from '../MainApi'
import Cookies from 'cookies-js'
const login = async (userData) => {
    const res = await API.post(`/user/admin-login`, userData);
    console.log(res);
    if (res.data) {
        localStorage.setItem('auth',  JSON.stringify(res.data))
    }

    return res.data;
}

const getOrders = async () => {
    const res = await API.get(`/user/get-orders`);
    console.log(res);

    if (res.data) {
        localStorage.setItem('orders', JSON.stringify(res.data))
    }

    return res.data;
}


const logout = async (userData) => {
    const res = await API.post(`/user/logout`, userData);
    console.log(res);
    if (res.data) {
        localStorage.removeItem('auth');
    }

    return res.data;
}

const authService = {
    login,
    logout,
    getOrders
}


export default authService;

