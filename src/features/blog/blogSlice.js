import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import blogService from './blogService';

import Cookies from 'cookies-js';


const initialState = { 
    blogs: localStorage.getItem('blogs') ? JSON.parse(localStorage.getItem('blogs')): [],
    createdBlog: localStorage.getItem('createdBlog') ? JSON.parse(localStorage.getItem('createdBlog')): [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
 }



export const getBlogs = createAsyncThunk('blog/get-blogs', async ( thunkAPI) => {
    try {
        console.log('hello');

        return await blogService.getBlogs();
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })

 export const createBlog = createAsyncThunk('blog/create-blog', async (data, thunkAPI) => {
    try {
        console.log('hello');

        return await blogService.createBlog(data);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })

 export const resetState = createAction('Reset-all');
const brandSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder ) => {
     builder

    .addCase(getBlogs.pending,(state) => {state.isLoading = true }  )
   
     
    .addCase(getBlogs.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.createdBlog = action?.payload;
    })

    .addCase(getBlogs.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.createdBlog = null;
        state.message = action.error;
    })



    .addCase(createBlog.pending,(state) => {state.isLoading = true }  )
    
    
    .addCase(createBlog.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.createdBlog = action?.payload;
    })

    .addCase(createBlog.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.createdBlog = null;
        state.message = action.error;
    })

    .addCase(resetState, () => initialState)
    },
});
export default brandSlice.reducer;


