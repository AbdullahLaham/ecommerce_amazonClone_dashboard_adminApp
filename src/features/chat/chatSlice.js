import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import chatService from './chatService';
import Cookies from 'cookies-js';
import { toast } from 'react-toastify';


const initialState = { 

    messages: [],
    currentMessage: {},
    currentChat: {},
    chats: [],
    // chats: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
 }



export const getMessages = createAsyncThunk('chat/get-messages', async (data, thunkAPI) => {
    try {
        console.log('hello');

        return await chatService.getMessages(data);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })



 
export const addMessage = createAsyncThunk('chat/add-message', async (data, thunkAPI) => {
    try {
        console.log('hello');

        return await chatService.addMessage(data);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })



 export const createChat = createAsyncThunk('chat/create-chat', async (data, thunkAPI) => {
    try {
        console.log('hello');

        return await chatService.createChat(data);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })

 export const getUserChats = createAsyncThunk('chat/user-chats', async (userId, thunkAPI) => {
    try {
        console.log('hello');

        return await chatService.getUserChats(userId);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })



 
 export const resetState = createAction('Reset-all');
const brandSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder ) => {
     builder

    .addCase(getMessages.pending,(state) => {state.isLoading = true }  )
   
     
    .addCase(getMessages.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.messages = action?.payload;
        // if (state?.isSuccess === true) {
        //     toast.success("Contact Form Submitted Successfully")
        // }
    })

    .addCase(getMessages.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.postedQuery = null;
        state.messages = action.error;
        if (state?.error === true) {
            toast.error("Some thing went wrong")
        }
    })







    .addCase(addMessage.pending,(state) => {state.isLoading = true }  )
   
     
    .addCase(addMessage.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.currentMessage = action?.payload;
        // if (state?.isSuccess === true) {
        //     toast.success("Contact Form Submitted Successfully")
        // }
    })

    .addCase(addMessage.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.currentMessage = null;
        state.message = action.error;
        if (state?.error === true) {
            toast.error("Some thing went wrong")
        }
    })





    .addCase(createChat.pending,(state) => {state.isLoading = true }  )
   
     
    .addCase(createChat.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.currentChat = action?.payload;
        // if (state?.isSuccess === true) {
        //     toast.success("Contact Form Submitted Successfully")
        // }
    })

    .addCase(createChat.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.currentChat = null;
        state.message = action.error;
        if (state?.error === true) {
            toast.error("Some thing went wrong")
        }
    })







    .addCase(getUserChats.pending,(state) => {state.isLoading = true }  )
   
     
    .addCase(getUserChats.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.chats = action?.payload;
        // if (state?.isSuccess === true) {
        //     toast.success("Contact Form Submitted Successfully")
        // }
    })

    .addCase(getUserChats.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.chats = null;
        state.message = action.error;
        if (state?.error === true) {
            toast.error("Some thing went wrong")
        }
    })



    .addCase(resetState, () => initialState)
    },
});
export default brandSlice.reducer;


