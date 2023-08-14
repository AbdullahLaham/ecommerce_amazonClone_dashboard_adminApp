import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import couponService from './couponService';

import Cookies from 'cookies-js';


const initialState = { 
    coupons: [],
    createdCoupon: {},
    deletedCoupon: {},
    updatedCoupon: {},
    currentCoupon: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
 }



export const getCoupons = createAsyncThunk('coupon/get-coupons', async ( thunkAPI) => {
    try {
        console.log('hello');

        return await couponService.getCoupons();
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 });


 export const createCoupon = createAsyncThunk('coupon/create-coupon', async (data,thunkAPI) => {
    try {
        console.log('hello');

        return await couponService.createCoupon(data);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }

 });

 export const updateCoupon = createAsyncThunk('coupon/update-coupon', async (data,thunkAPI) => {
    try {
        console.log('hello');

        return await couponService.updateCoupon(data);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }

 });

 export const deleteCoupon = createAsyncThunk('coupon/delete-coupon', async (id,thunkAPI) => {
    try {
        console.log('hello');

        return await couponService.deleteCoupon(id);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }

 });

 export const getCoupon = createAsyncThunk('coupon/get-coupon', async (id,thunkAPI) => {
    try {
        console.log('hello');

        return await couponService.getCoupon(id);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }

 });
 export const resetState = createAction('Reset-all');







const couponSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder ) => {
     builder

     .addCase(getCoupons.pending,(state) => {state.isLoading = true }  )
     
    .addCase(getCoupons.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.coupons = action?.payload;
    })

    .addCase(getCoupons.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.coupons = null;
        state.message = action.error;
    })


    .addCase(createCoupon.pending,(state) => {state.isLoading = true }  )

    
    .addCase(createCoupon.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.createdCoupon = action?.payload;
    })

    .addCase(createCoupon.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.createdCoupon = null;
        state.message = action.error;
    })


    .addCase(updateCoupon.pending,(state) => {state.isLoading = true }  )

    
    .addCase(updateCoupon.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.updatedCoupon = action?.payload;
    })

    .addCase(updateCoupon.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.updatedCoupon = null;
        state.message = action.error;
    })



    .addCase(deleteCoupon.pending,(state) => {state.isLoading = true }  )

    
    .addCase(deleteCoupon.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.deletedCoupon = action?.payload;
    })

    .addCase(deleteCoupon.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.deletedCoupon = null;
        state.message = action.error;
    })



    .addCase(getCoupon.pending,(state) => {state.isLoading = true }  )

    
    .addCase(getCoupon.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.currentCoupon = action?.payload;
    })

    .addCase(getCoupon.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.currentCoupon = null;
        state.message = action.error;
    })

    .addCase(resetState, () => initialState)

    },
});
export default couponSlice.reducer;


