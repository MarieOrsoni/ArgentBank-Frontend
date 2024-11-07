import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "./../Token.js"

export const userSignUp = createAsyncThunk(
    'user/signup',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post('/user/signup', userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);

        }
    }
);

const initialState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    userName: '',
    status: 'idle',
    error: null,
};

const userSignUpSlice = createSlice ({
    name: 'newUser',
    initialState,
    reducers: {},
    
    extraReducers: (builder) => {
        builder
        .addCase(userSignUp.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(userSignUp.fulfilled, (state, action)=>{
            const {email, password, firstName, lastName, userName} = action.payload;
            state.email = email;
            state.password = password;
            state.firstName = firstName;
            state.lastName = lastName;
            state.userName = userName;
            state.status = 'succeeded';
            state.error = null;
        })
        .addCase(userSignUp.rejected, (state, action)=> {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});
export const { resetUserState } = userSignUpSlice.actions;
export default userSignUpSlice.reducer;