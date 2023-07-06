import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import Cookies from 'cookies-js';
import EnquiryService from './enquiryService';


const initialState = { 
    enquiries: [],
    currentEnquiry: {},
    deletedEnquiry: {},
    updatedEnquiry: {},

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



 export const getEnquiry = createAsyncThunk('enquiry/get-enquiry', async (id, thunkAPI) => {
    try {
        console.log('hello');

        return await EnquiryService.getEnquiry(id);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })
 
 
 export const deleteEnquiry = createAsyncThunk('enquiry/delete-enquiry', async (id, thunkAPI) => {
    try {
        console.log('hello');

        return await EnquiryService.deleteEnquiry(id);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 });


  
 export const updateEnquiry = createAsyncThunk('enquiry/update-enquiry', async (data, thunkAPI) => {
    try {
        console.log('hello');

        return await EnquiryService.updateEnquiry(data);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 });


 export const resetState = createAction('Reset-all');
const enquirySlice = createSlice({
  name: 'enquiries',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder ) => {
     builder
     .addCase(getEnquiries.pending,(state) => {state.isLoading = true }  )
    
     
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



    .addCase(getEnquiry.pending,(state) => {state.isLoading = true }  )
    
     
    .addCase(getEnquiry.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.currentEnquiry = action?.payload;
    })

    .addCase(getEnquiry.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.currentEnquiry = null;
        state.message = action.error;
    })


    .addCase(deleteEnquiry.pending,(state) => {state.isLoading = true }  )
    
     
    .addCase(deleteEnquiry.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.deletedEnquiry = action?.payload;
    })

    .addCase(deleteEnquiry.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.deletedEnquiry = null;
        state.message = action.error;
    })


    
    .addCase(updateEnquiry.pending,(state) => {state.isLoading = true }  )
    
     
    .addCase(updateEnquiry.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.updatedEnquiry = action?.payload;
    })

    .addCase(updateEnquiry.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.updatedEnquiry = null;
        state.message = action.error;
    })







    .addCase(resetState, () => initialState)
    },
});
export default enquirySlice.reducer;


