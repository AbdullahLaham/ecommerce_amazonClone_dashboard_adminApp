import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import customerReducer from '../features/customers/customerSlice';
import productReducer from '../features/product/productSlice';
import brandReducer from '../features/brand/brandSlice';
import categoryReducer from '../features/pcategory/pcategorySlice';
import colorReducer from '../features/pcolor/pcolorSlice';
import blogReducer from '../features/blog/blogSlice';
import blogCategoryReducer from '../features/bcategory/bcategorySlice'
import enquiryReducer from '../features/enquiry/enquirySlice'
import orderReducer from '../features/auth/authSlice';
import uploadReducer from '../features/upload/uploadSlice';
import couponReducer from '../features/coupon/couponSlice';
import chatReducer from '../features/chat/chatSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        customers: customerReducer,
        products: productReducer,
        brands: brandReducer,
        categories: categoryReducer,
        colors: colorReducer,
        blogs: blogReducer,
        blogCategories: blogCategoryReducer,
        enquiries: enquiryReducer,
        orders: orderReducer,
        uploads: uploadReducer,
        coupons: couponReducer,
        chat: chatReducer
    },
});
