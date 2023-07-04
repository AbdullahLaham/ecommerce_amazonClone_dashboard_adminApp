import axios from "axios";
import API from '../MainApi'
import Cookies from 'cookies-js'

const getBlogCategories = async () => {
    const res = await API.get(`/blogcategory`);
    console.log(res, 'pppppppppppooooooooo');

    if (res.data) {
        localStorage.setItem('blogCategories', JSON.stringify(res.data))
    }

    return res.data;
}

const createBlogCategory = async (data) => {
    const res = await API.post(`/blogcategory`, data);
    console.log(res, 'pppppppppppooooooooo');

    if (res.data) {
        localStorage.setItem('createdBlogCategory', JSON.stringify(res.data))
    }

    return res.data;
}


const deleteBlogCategory = async (id) => {
    const res = await API.delete(`/blogcategory/${id}`);
    console.log(res, 'pppppppppppooooooooo');

    if (res.data) {
        localStorage.setItem('deltedBlogCategory', {});
    }

    return res.data;
}

const bcategoryService = {
    getBlogCategories,
    createBlogCategory,
    deleteBlogCategory,
}


export default bcategoryService;

