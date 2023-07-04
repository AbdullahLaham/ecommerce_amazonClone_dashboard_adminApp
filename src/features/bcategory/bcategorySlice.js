import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import bCategoryService from './bcategoryService';

import Cookies from 'cookies-js';


const initialState = { 
    blogCategories: localStorage.getItem('blogCategories') ? JSON.parse(localStorage.getItem('blogCategories')): [],
    createdBlogCategory: localStorage.getItem('createdBlogCategory') ? JSON.parse(localStorage.getItem('createdBlogCategory')): [],
    deletedBlogCategory: localStorage.getItem('createdBlogCategory') ? JSON.parse(localStorage.getItem('createdBlogCategory')): [],
    
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
 }



export const getBlogCategories = createAsyncThunk('bcategory/get-bcategories', async ( thunkAPI) => {
    try {
        console.log('hello');

        return await bCategoryService.getBlogCategories();
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })

 export const createBlogCategory = createAsyncThunk('bcategory/create-bcategory', async (data, thunkAPI) => {
    try {
        console.log('hello');

        return await bCategoryService.createBlogCategory(data);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })

 export const deleteBlogCategory = createAsyncThunk('bcategory/delete-bcategory', async (id, thunkAPI) => {
    try {
        console.log('hello');

        return await bCategoryService.deleteBlogCategory(id);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })


export const resetState = createAction('Reset-all');

const bcategorySlice = createSlice({
  name: 'blogCategories',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder ) => {
     builder
    .addCase(getBlogCategories.pending,(state) => {state.isLoading = true }  )

    .addCase(getBlogCategories.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.blogCategories = action?.payload;
    })

    .addCase(getBlogCategories.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.blogCategories = null;
        state.message = action.error;
    })




    .addCase(createBlogCategory.pending,(state) => {state.isLoading = true }  )

    .addCase(createBlogCategory.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.createdBlogCategory = action?.payload;
    })

    .addCase(createBlogCategory.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.createdBlogCategory = null;
        state.message = action.error;
    })



    
    .addCase(deleteBlogCategory.pending,(state) => {state.isLoading = true }  )

    .addCase(deleteBlogCategory.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.deletedBlogCategory = action?.payload;
        state.blogCategories = state.blogCategories.map((categ) => {
            return categ._id !== action.payload._id;
        });
    })

    .addCase(deleteBlogCategory.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.deletedBlogCategory = null;
        state.message = action.error;
    })
    .addCase(resetState, () => initialState)

    },
});
export default bcategorySlice.reducer;


