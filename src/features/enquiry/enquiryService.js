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

const EnquiryService = {
    getEnquiries,
}


export default EnquiryService;

