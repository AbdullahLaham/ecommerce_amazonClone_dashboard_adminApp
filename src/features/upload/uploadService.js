import axios from "axios";
import API from '../MainApi'
import Cookies from 'cookies-js'

const uploadImage = async (data) => {
    const res = await API.put(`product/upload/`, data);
    console.log(res);

    if (res.data) {
        localStorage.setItem('images', JSON.stringify(res.data))
    }

    return res.data;
}


const deleteImage = async (id) => {
    const res = await API.delete(`product/delete-img/${id}/`);
    console.log(res);

    if (res.data) {
        localStorage.setItem('images', JSON.stringify(res.data))
    }

    return res.data;
}


const uploadService = {
    uploadImage,
    deleteImage
}


export default uploadService;
