import axios from "axios";
import API from '../MainApi'
import Cookies from 'cookies-js'

const getCoupons = async () => {
    const res = await API.get(`/coupon`);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}

const createCoupon = async (data) => {
    const res = await API.post(`/coupon`, data);
    console.log(res);

    if (res.data) {
        localStorage.setItem('createdCoupon', JSON.stringify(res.data))
    }

    return res.data;
}

const updateCoupon = async (data) => {
    const {id, coupon} = data ;
    const res = await API.put(`/coupon/${id}`, coupon);
    console.log(res);

    if (res.data) {
        localStorage.setItem('updatedCoupon', JSON.stringify(res.data))
    }

    return res.data;
}

const deleteCoupon = async (id) => {
    const res = await API.delete(`/coupon/${id}`);
    console.log(res);

    if (res.data) {
        localStorage.setItem('deletedCoupon', JSON.stringify(res.data))
    }

    return res.data;
}

const getCoupon = async (id) => {
    const res = await API.get(`/coupon/${id}`);
    console.log(res);

    if (res.data) {
        localStorage.setItem('currentCoupon', JSON.stringify(res.data))
    }

    return res.data;
}

const couponService = {
    getCoupons,
    createCoupon,
    getCoupon,
    deleteCoupon,
    updateCoupon,
}


export default couponService;

