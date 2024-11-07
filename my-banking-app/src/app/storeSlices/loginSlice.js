import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axioConfig.js";

const initialState = {
  token: null,
  loginStatus: "idle",
  error: null,
};

// Thunk to handle login verification
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/user/login", {
        email: credentials.email,
        password: credentials.password,
      });
      console.log(response.data);
      const { token } = response.data.body;
      localStorage.setItem("authToken", token);
      dispatch(setToken(token));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message || "login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem("authToken");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
