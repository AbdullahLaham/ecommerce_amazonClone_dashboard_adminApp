import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import colorService from './pcolorService';

import Cookies from 'cookies-js';


const initialState = { 
    colors: localStorage.getItem('colors') ? JSON.parse(localStorage.getItem('colors')): [],
    createdColor: {},
    updatedColor: {},
    deletedColor: {},
    currentColor: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
 }



export const getColors = createAsyncThunk('color/get-colors', async ( thunkAPI) => {
    try {
        console.log('hello');

        return await colorService.getColors();
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })


 export const createColor = createAsyncThunk('color/create-color', async (color, thunkAPI) => {
    try {
        console.log('hello');

        return await colorService.createColor(color);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })


 
 
 export const getColor = createAsyncThunk('color/get-color', async (id, thunkAPI) => {
    try {
        console.log('hello');

        return await colorService.getColor(id);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 });

 export const updateColor = createAsyncThunk('color/update-color', async (data, thunkAPI) => {
    try {
        console.log('hello');

        return await colorService.updateColor(data);
        
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }

 });



 export const deleteColor = createAsyncThunk('color/delete-color', async (id, thunkAPI) => {
    try {
        console.log('hello');

        return await colorService.deleteColor(id);
        
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }

 });




 export const resetState = createAction('Reset-all');

const ColorSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder ) => {
     builder
     .addCase(getColors.pending,(state) => {state.isLoading = true }  )

    .addCase(getColors.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.colors = action?.payload;
    })

    .addCase(getColors.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.colors = null;
        state.message = action.error;
    })



    .addCase(createColor.pending,(state) => {state.isLoading = true }  )

    .addCase(createColor.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.createdColor = action?.payload;
    })

    .addCase(createColor.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.colors = null;
        state.message = action.error;
    })




    .addCase(getColor.pending,(state) => {state.isLoading = true }  )

    .addCase(getColor.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.currentColor = action?.payload;
    })

    .addCase(getColor.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.currentColor = null;
        state.message = action.error;
    })




    .addCase(updateColor.pending,(state) => {state.isLoading = true }  )

    .addCase(updateColor.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.updatedColor = action?.payload;
    })

    .addCase(updateColor.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.updatedColor = null;
        state.message = action.error;
    })





    .addCase(deleteColor.pending,(state) => {state.isLoading = true }  )

    .addCase(deleteColor.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.deletedColor = action?.payload;
    })

    .addCase(deleteColor.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.deletedColor = null;
        state.message = action.error;
    })
    .addCase(resetState, () => initialState)


    },
});
export default ColorSlice.reducer;


