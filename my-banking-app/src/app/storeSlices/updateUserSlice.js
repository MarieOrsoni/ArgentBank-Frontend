import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axioConfig.js";

const initialState = {
  user: {
    userName: "",
  },
  status: "idle",
  error: null,
};

export const updateUserName = createAsyncThunk(
  "updateName/updateUserName",
  async (updateData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return rejectWithValue("Token is missing, no username info");
      }
      const response = await api.put("/user/profile", updateData);
      if (!response) {
        throw new Error("Updating user info failed");
      }
      const data = await response.data.body;
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user info"
      );
    }
  }
);

const updateUserSlice = createSlice({
  name: "updateName",
  initialState,
  reducers: {
    /*resetUserState: (state) => {
      Object.assign(state, initialState);
    },*/
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserName.pending, (state) => {
        state.loginStatus = "loading";
        state.error = null;
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload;
      });
  },
});
export const { resetUserState } = updateUserSlice.actions;
export default updateUserSlice.reducer;
