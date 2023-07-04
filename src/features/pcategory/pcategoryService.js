import axios from "axios";
import API from '../MainApi'
import Cookies from 'cookies-js'

const getProductCategories = async () => {
    const res = await API.get(`/category`);
    console.log(res);

    if (res.data) {
        localStorage.setItem('categories', JSON.stringify(res.data))
    }

    return res.data;
}

const createCategory = async (category) => {
    const res = await API.post(`/category`, category);
    console.log(res);

    if (res.data) {
        localStorage.setItem('createdCategory', JSON.stringify(res.data))
    }

    return res.data;
}






const getACategory = async (id) => {
    const res = await API.get(`/category/${id}`);
    console.log(res);

    if (res.data) {
        localStorage.setItem('currentCategory', JSON.stringify(res.data))
    }

    return res.data;

}



const updateCategory = async (data) => {
    const {category, id} = data
    const res = await API.put(`/category/${id}`, category);
    console.log(res);

    if (res.data) {
        localStorage.setItem('updatedCategory', JSON.stringify(res.data))
    }

    return res.data;

}


const deleteCategory = async (id) => {
    // const { id } = data ;
    const res = await API.delete(`/category/${id}`);
    console.log(res);

    if (res.data) {
        localStorage.setItem('deletedCategory', JSON.stringify(res.data))
    }

    return res.data;

}




const pCategoryService = {
    getProductCategories,
    createCategory,
    deleteCategory,
    updateCategory,
    getACategory,
}


export default pCategoryService;

