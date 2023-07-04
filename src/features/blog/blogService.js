import axios from "axios";
import API from '../MainApi'
import Cookies from 'cookies-js'

const getBlogs = async () => {
    const res = await API.get(`/blog`);
    console.log(res);

    if (res.data) {
        localStorage.setItem('blogs', JSON.stringify(res.data))
    }

    return res.data;
}

const createBlog = async (data) => {
    const res = await API.post(`/blog`, data);

    console.log(res);

    if (res.data) {
        localStorage.setItem('createdBlog', JSON.stringify(res.data));
    }
    return res.data;
}

const blogService = {
    getBlogs,
    createBlog

}


export default blogService;

