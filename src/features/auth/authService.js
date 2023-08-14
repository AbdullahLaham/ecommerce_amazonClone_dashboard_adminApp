import axios from "axios";
import API from '../MainApi'
import Cookies from 'cookies-js'



const getAllUsers = async () => {
    const res = await API.get(`/user/admin-users`);
    console.log(res);
    
    return res.data;
}

const login = async (userData) => {
    const res = await API.post(`/user/admin-login`, userData);
    console.log(res);
    if (res.data) {
        localStorage.setItem('auth',  JSON.stringify(res.data))
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
const getOrders = async () => {
    const res = await API.get(`/user/get-orders`);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}



const getOrdersByID = async (id) => {
    const res = await API.get(`/user/get-orders/${id}`);
    console.log(res);
    
    if (res.data) {
        localStorage.setItem('userOrders', JSON.stringify(res.data))
    }

    return res.data;
}

const authService = {
    login,
    logout,
    getOrders,
    getOrdersByID,
    getAllUsers
}


export default authService;

