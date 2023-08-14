import axios from "axios";

const API = axios.create({ baseURL: 'https://ecommerce-as-amazon-nodejs-backend.onrender.com/' });
const user = JSON.parse(localStorage.getItem('auth'));

API.interceptors.request.use((req) => {
    if (localStorage.getItem('auth')) {
        req.headers.authorization = `Bearer ${user.token}`
    }
    return req;
});
export default API;