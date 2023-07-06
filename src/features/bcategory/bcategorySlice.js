import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import bCategoryService from './bcategoryService';

import Cookies from 'cookies-js';
import { dataItem } from 'react-widgets/cjs/Accessors';


const initialState = { 
    blogCategories: localStorage.getItem('blogCategories') ? JSON.parse(localStorage.getItem('blogCategories')): [],
    createdBlogCategory: {},
    deletedBlogCategory: {},
    currentBlogCategory: {},
    updatedBlogCategory: {},
    
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

 export const updateBlogCategory = createAsyncThunk('bcategory/update-bcategory', async (dataItem, thunkAPI) => {
    try {
        console.log('hello');

        return await bCategoryService.updateBlogCategory(dataItem);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })

 export const getBlogCategory = createAsyncThunk('bcategory/get-bcategory', async (id, thunkAPI) => {
    try {
        console.log('hello');

        return await bCategoryService.getBlogCategory(id);
        
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
       
    })

    .addCase(deleteBlogCategory.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.deletedBlogCategory = null;
        state.message = action.error;
    })


    .addCase(getBlogCategory.pending,(state) => {state.isLoading = true }  )

    .addCase(getBlogCategory.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.currentBlogCategory = action?.payload;
    })

    .addCase(getBlogCategory.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.currentBlogCategory = null;
        state.message = action.error;
    })






    .addCase(updateBlogCategory.pending,(state) => {state.isLoading = true }  )

    .addCase(updateBlogCategory.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.updatedBlogCategory = action?.payload;
        
    })

    .addCase(updateBlogCategory.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.updatedBlogCategory = null;
        state.message = action.error;
    })

    },
});
export default bcategorySlice.reducer;


