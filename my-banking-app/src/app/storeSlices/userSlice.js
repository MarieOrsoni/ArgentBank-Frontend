import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axioConfig.js";

//Initial state
const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return rejectWithValue("Token is missing, no user info");
      }
      const response = await api.get("/user/profile");
      return response.data.body;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user info"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        console.log("User data payload:", action.payload);
        const userData = action.payload;
        if (userData && userData.id) {
          state.user = userData;
        }
        state.status = "succeeded";
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to load user info";
      });
  },
});

export default userSlice.reducer;
