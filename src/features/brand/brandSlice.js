import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import brandService from './brandService';

import Cookies from 'cookies-js';


const initialState = { 
    brands: [],
    currentBrand: localStorage.getItem('currentBrand') ? JSON.parse(localStorage.getItem('currentBrand')): {},
    createdBrand: {},
    updatedBrand: {}, 
    deletedBrand: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
 }



export const getBrands = createAsyncThunk('brand/get-brands', async ( thunkAPI) => {
    try {
        console.log('hello');

        return await brandService.getBrands();
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 });


 export const createBrand = createAsyncThunk('brand/create-brand', async (brandTitle,thunkAPI) => {
    try {
        console.log('hello');

        return await brandService.createBrand(brandTitle);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }

 });

 export const getABrand = createAsyncThunk('brand/get-brand', async (id, thunkAPI) => {
    try {
        console.log('hello');

        return await brandService.getABrand(id);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 });

 export const updateBrand = createAsyncThunk('brand/update-brand', async (data, thunkAPI) => {
    try {
        console.log('hello');

        return await brandService.updateBrand(data);
        
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }

 });



 export const deleteBrand = createAsyncThunk('brand/delete-brand', async (id, thunkAPI) => {
    try {
        console.log('hello');

        return await brandService.deleteBrand(id);
        
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }

 });


 export const resetState = createAction('Reset-all');







const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder ) => {
     builder
     .addCase(createBrand.pending,(state) => {state.isLoading = true }  )
     
    .addCase(createBrand.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.brands = action?.payload;
    })

    .addCase(createBrand.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.brands = null;
        state.message = action.error;
    })


    .addCase(getBrands.pending,(state) => {state.isLoading = true }  )
    
    
    .addCase(getBrands.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.brands = action?.payload;
    })

    .addCase(getBrands.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.brands = null;
        state.message = action.error;
    })


    .addCase(getABrand.pending,(state) => {state.isLoading = true }  )
    

    .addCase(getABrand.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.currentBrand = action?.payload;
    })

    .addCase(getABrand.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.brands = null;
        state.message = action.error;
    })





    .addCase(updateBrand.pending,(state) => {state.isLoading = true }  )
    

    .addCase(updateBrand.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.updatedBrand = action?.payload;
    })

    .addCase(updateBrand.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.brands = null;
        state.message = action.error;
    })



    .addCase(deleteBrand.pending,(state) => {state.isLoading = true }  )
    

    .addCase(deleteBrand.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.deletedBrand = action?.payload;
    })

    .addCase(deleteBrand.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.brands = null;
        state.message = action.error;
    })



    
    .addCase(resetState, () => initialState)

    },
});
export default brandSlice.reducer;


