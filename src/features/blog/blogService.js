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


const getBlog = async (id) => {
    const res = await API.get(`/blog/${id}`);

    console.log(res);

    if (res.data) {
        localStorage.setItem('currentBlog', JSON.stringify(res.data));
    }
    return res.data;
}


const updateBlog = async (data) => {
    const {id, blog} = data;
    const res = await API.put(`/blog/${id}`, blog);

    console.log(res);

    if (res.data) {
        localStorage.setItem('updatedBlog', JSON.stringify(res.data));
    }
    return res.data;
}


const deleteBlog = async (id) => {
    const res = await API.delete(`/blog/${id}`);

    console.log(res);

    if (res.data) {
        localStorage.setItem('deletedBlog', JSON.stringify(res.data));
    }
    return res.data;
}

const blogService = {
    getBlogs,
    createBlog,
    getBlog,
    updateBlog,
    deleteBlog,


}


export default blogService;

