import axios from "axios";
import API from '../MainApi'
import Cookies from 'cookies-js'

const getEnquiries = async () => {
    const res = await API.get(`/enquiry`);
    console.log(res);

    if (res.data) {
        localStorage.setItem('enquiries', JSON.stringify(res.data))
    }

    return res.data;
}

const getEnquiry = async (id) => {
    const res = await API.get(`/enquiry/${id}`);
    console.log(res);

    if (res.data) {
        localStorage.setItem('currentEnquiry', JSON.stringify(res.data))
    }

    return res.data;
}

const deleteEnquiry = async (id) => {
    const res = await API.delete(`/enquiry/${id}`);
    console.log(res);

    if (res.data) {
        localStorage.setItem('deletedEnquiry', JSON.stringify(res.data))
    }

    return res.data;
}

const updateEnquiry = async (data) => {
    const {id, enquiry} = data;
    const res = await API.put(`/enquiry/${id}`, enquiry);
    
    console.log(res);

    if (res.data) {
        localStorage.setItem('updatedEnquiry', JSON.stringify(res.data))
    }

    return res.data;
}

const EnquiryService = {
    getEnquiries,
    getEnquiry,
    deleteEnquiry,
    updateEnquiry
}


export default EnquiryService;

