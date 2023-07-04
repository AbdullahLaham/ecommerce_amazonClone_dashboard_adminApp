import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import productService from './productService';
import Cookies from 'cookies-js';


const initialState = { 
    products: localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')): [],
    createdProduct: localStorage.getItem('createdProduct') ? JSON.parse(localStorage.getItem('createdProduct')): [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
 }



export const getProducts = createAsyncThunk('products/get-products', async (user, thunkAPI) => {
    try {
        console.log('hello')

        return await productService.getProducts();
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 });
 export const createProduct = createAsyncThunk("product/create-products", async (productData, thunkAPI) => {
    try {
        console.log('hello')

        return await productService.createProduct(productData);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
 })
 export const resetState = createAction('Reset-all');
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder ) => {
     builder
     .addCase(getProducts.pending,(state) => {state.isLoading = true }  )
    //  .addCase(login.fulfilled,(state, action) => {
    //     state.isLoading = false ;
    //     state.isSuccess = true;
    //     state.user = action?.payload;
    // })
    .addCase(getProducts.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.products = action?.payload;
    })

    .addCase(getProducts.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.products = null;
        state.message = action.error;
    })

    .addCase(createProduct.pending,(state) => {state.isLoading = true }  )
    //  .addCase(login.fulfilled,(state, action) => {
    //     state.isLoading = false ;
    //     state.isSuccess = true;
    //     state.user = action?.payload;
    // })
    .addCase(createProduct.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.createdProduct = action?.payload;
    })

    .addCase(createProduct.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.products = null;
        state.message = action.error;
    })

    .addCase(resetState, () => initialState)

    },
});
export default productSlice.reducer;


