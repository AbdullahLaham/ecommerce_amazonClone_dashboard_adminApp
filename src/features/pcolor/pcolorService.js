import axios from "axios";
import API from '../MainApi'
import Cookies from 'cookies-js'

const getColors = async () => {
    const res = await API.get(`/color`);
    console.log(res);

    if (res.data) {
        localStorage.setItem('colors', JSON.stringify(res.data))
    }

    return res.data;
}

const createColor = async (color) => {
    const res = await API.post(`/color`, color);
    console.log(res);

    if (res.data) {
        localStorage.setItem('createdColor', JSON.stringify(res.data))
    }

    return res.data;
}





const getColor = async (id) => {
    const res = await API.get(`/color/${id}`);
    console.log(res);

    if (res.data) {
        localStorage.setItem('currentColor', JSON.stringify(res.data))
    }

    return res.data;

}



const updateColor = async (data) => {
    const {color, id} = data
    const res = await API.put(`/color/${id}`, color);
    console.log(res);

    if (res.data) {
        localStorage.setItem('updatedColor', JSON.stringify(res.data))
    }

    return res.data;

}


const deleteColor= async (id) => {
    // const { id } = data ;
    const res = await API.delete(`/color/${id}`);
    console.log(res);

    if (res.data) {
        localStorage.setItem('deletedColor', JSON.stringify(res.data))
    }

    return res.data;

}




const ColorService = {
    getColors,
    createColor,
    getColor,
    updateColor,
    deleteColor,
}


export default ColorService;

