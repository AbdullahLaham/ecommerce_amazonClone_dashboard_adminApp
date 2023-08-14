import axios from "axios";
import API from '../MainApi'
import Cookies from 'cookies-js'

const getUsers = async () => {
    const res = await API.get(`/user/all-users`);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}

const customerService = {
    getUsers,
}


export default customerService;
