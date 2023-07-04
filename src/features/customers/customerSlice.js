import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import customerService from './customersService';
import Cookies from 'cookies-js';


const initialState = { 
    customers: localStorage.getItem('customers') ? JSON.parse(localStorage.getItem('customers')): [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
 }



export const getUsers = createAsyncThunk('customer/get-customers', async (user, thunkAPI) => {
    try {
        console.log('hello')

        return await customerService.getUsers();
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })

 export const resetState = createAction('Reset-all');
const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder ) => {
     builder
     .addCase(getUsers.pending,(state) => {state.isLoading = true }  )
    //  .addCase(login.fulfilled,(state, action) => {
    //     state.isLoading = false ;
    //     state.isSuccess = true;
    //     state.user = action?.payload;
    // })
    .addCase(getUsers.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.customers = action?.payload;
    })

    .addCase(getUsers.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.customers = null;
        state.message = action.error;
    })

    .addCase(resetState, () => initialState)

    },
});
export default customerSlice.reducer;


