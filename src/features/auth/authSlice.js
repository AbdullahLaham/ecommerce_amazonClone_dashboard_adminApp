import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import Cookies from 'cookies-js';
// const userDefaultState = {
//     _id: null,
//     firstname: '',
//     lastname: '',
//     email: '',
//     mobile: '',
//     token: '',
// }

const initialState = { 
    user: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')): null,
    orders: localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')): [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
 }



export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        console.log('hello')

        return await authService.login(user);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })

 export const getOrders = createAsyncThunk('order/get-orders', async ( thunkAPI) => {
    try {
        console.log('hello');

        return await authService.getOrders();
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })
 export const logout = createAsyncThunk('auth/logout', async (user, thunkAPI) => {
    try {
        console.log('hello')

        return await authService.logout(user);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }

 })

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder ) => {
     builder
     .addCase(login.pending,(state) => {state.isLoading = true }  )
    //  .addCase(login.fulfilled,(state, action) => {
    //     state.isLoading = false ;
    //     state.isSuccess = true;
    //     state.user = action?.payload;
    // })
    .addCase(login.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false;
        state.isSuccess = true;
        state.user = action?.payload;
    })

    .addCase(login.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
    })




    .addCase(logout.pending,(state) => {state.isLoading = true }  )
    //  .addCase(login.fulfilled,(state, action) => {
    //     state.isLoading = false ;
    //     state.isSuccess = true;
    //     state.user = action?.payload;
    // })
    .addCase(logout.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false;
        state.isSuccess = true;
        state.user = action?.payload;
    })

    .addCase(logout.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
    }) 



    .addCase(getOrders.pending,(state) => {state.isLoading = true }  )
    //  .addCase(login.fulfilled,(state, action) => {
    //     state.isLoading = false ;
    //     state.isSuccess = true;
    //     state.user = action?.payload;
    // })
    .addCase(getOrders.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.orders = action?.payload;
    })

    .addCase(getOrders.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.orders = null;
        state.message = action.error;
    })

    },
});



export default authSlice.reducer;


