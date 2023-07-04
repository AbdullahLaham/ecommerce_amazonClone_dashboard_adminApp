import axios from "axios";
import API from '../MainApi'
import Cookies from 'cookies-js'

const getProducts = async () => {
    const res = await API.get(`/product/`);
    console.log(res);

    if (res.data) {
        localStorage.setItem('products', JSON.stringify(res.data))
    }

    return res.data;
}

const createProduct = async (product) => {
    const res = await API.post('/product/create', product);
    if (res?.data) {
        localStorage.setItem('createdProduct', JSON.stringify(res.data))
    }
    return res.data;
}


const productService = {
    getProducts,
    createProduct,
}


export default productService;
