import axios from "axios";
import API from '../MainApi'
import Cookies from 'cookies-js'

const getBrands = async () => {
    const res = await API.get(`/brand`);
    console.log(res);

    if (res.data) {
        localStorage.setItem('brands', JSON.stringify(res.data))
    }

    return res.data;
}

const createBrand = async (brand) => {
    const res = await API.post(`/brand`, brand);
    console.log(res);

    if (res.data) {
        localStorage.setItem('createdBrand', JSON.stringify(res.data))
    }

    return res.data;
}

const getABrand = async (id) => {
    const res = await API.get(`/brand/${id}`);
    console.log(res);

    if (res.data) {
        localStorage.setItem('currentBrand', JSON.stringify(res.data))
    }

    return res.data;

}



const updateBrand = async (data) => {
    const {brand, id} = data
    const res = await API.put(`/brand/${id}`, brand);
    console.log(res);

    if (res.data) {
        localStorage.setItem('updatedBrand', JSON.stringify(res.data))
    }

    return res.data;

}


const deleteBrand = async (id) => {
    // const { id } = data ;
    const res = await API.delete(`/brand/${id}`);
    console.log(res);

    if (res.data) {
        localStorage.setItem('deletedBrand', JSON.stringify(res.data))
    }

    return res.data;

}

const brandService = {
    getBrands,
    createBrand,
    getABrand,
    updateBrand,
    deleteBrand,
}



export default brandService ;

