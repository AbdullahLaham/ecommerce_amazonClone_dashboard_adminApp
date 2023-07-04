import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import Cookies from 'cookies-js';
import EnquiryService from './enquiryService';


const initialState = { 
    enquiries: localStorage.getItem('enquiries') ? JSON.parse(localStorage.getItem('enquiries')): [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
 }



export const getEnquiries = createAsyncThunk('enquiry/get-enquiries', async ( thunkAPI) => {
    try {
        console.log('hello');

        return await EnquiryService.getEnquiries();
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })

 export const resetState = createAction('Reset-all');
const enquirySlice = createSlice({
  name: 'enquiries',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder ) => {
     builder
     .addCase(getEnquiries.pending,(state) => {state.isLoading = true }  )
    //  .addCase(login.fulfilled,(state, action) => {
    //     state.isLoading = false ;
    //     state.isSuccess = true;
    //     state.user = action?.payload;
    // })
    .addCase(getEnquiries.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.enquiries = action?.payload;
    })

    .addCase(getEnquiries.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.enquiries = null;
        state.message = action.error;
    })

    .addCase(resetState, () => initialState)
    },
});
export default enquirySlice.reducer;


