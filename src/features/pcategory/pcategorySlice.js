import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import categoryService from './pcategoryService';

import Cookies from 'cookies-js';


const initialState = { 
    categories: [],
    createdCategory: {},
    deletedCategory: {},
    updatedCategory: {},
    currentCategory: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
 }



export const getCategories = createAsyncThunk('category/get-categories', async ( thunkAPI) => {
    try {
        console.log('hello');

        return await categoryService.getProductCategories();
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })

 export const createCategory = createAsyncThunk('category/create-category', async (category, thunkAPI) => {
    try {
        console.log('hello');
        return await categoryService.createCategory(category);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })


 
 export const getCategory = createAsyncThunk('category/get-category', async (id, thunkAPI) => {
    try {
        console.log('hello');

        return await categoryService.getACategory(id);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 });

 export const updateCategory = createAsyncThunk('category/update-category', async (data, thunkAPI) => {
    try {
        console.log('hello');

        return await categoryService.updateCategory(data);
        
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }

 });



 export const deleteCategory = createAsyncThunk('category/delete-category', async (id, thunkAPI) => {
    try {
        console.log('hello');

        return await categoryService.deleteCategory(id);
        
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }

 });




 export const resetState = createAction('Reset-all');
const pCategorySlice = createSlice({
  name: 'pCategories',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder ) => {
     builder
     .addCase(getCategories.pending,(state) => {state.isLoading = true }  )
    
    
    .addCase(getCategories.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.categories = action?.payload;
    })

    .addCase(getCategories.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.categories = null;
        state.message = action.error;
    })

    .addCase(createCategory.pending,(state) => {state.isLoading = true }  )
    
    
    .addCase(createCategory.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.createdCategory = action?.payload;
    })

    .addCase(createCategory.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.categories = null;
        state.message = action.error;
    })


    .addCase(deleteCategory.pending,(state) => {state.isLoading = true }  )
  
    
    .addCase(deleteCategory.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.deletedCategory = action?.payload;
    })

    .addCase(deleteCategory.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.deletedCategory = null;
        state.message = action.error;
    })



    .addCase(updateCategory.pending,(state) => {state.isLoading = true }  )
   
    
    .addCase(updateCategory.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.updatedCategory = action?.payload;
    })

    .addCase(updateCategory.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.updatedCategory = null;
        state.message = action.error;
    })




    .addCase(getCategory.pending,(state) => {state.isLoading = true }  )

    
    .addCase(getCategory.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.currentCategory = action?.payload;
    })

    .addCase(getCategory.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.currentCategory = null;
        state.message = action.error;
    })

    .addCase(resetState, () => initialState)


    },
});
export default pCategorySlice.reducer;


