import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../Token.js";


export const updateUserName = createAsyncThunk(
    "app/updateUserName",
    async (updateData, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await api.put("/user/profile", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });
        if (!response.ok) {
          throw new Error("Updating user info failed");
        }
        const data = await response.data.body;
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  const initialState = {
    updateUser: {
        userName: "",
    },
    status: 'idle',
    error: null,
  };
  const updateUserSlice = createSlice({
    name: 'updateName',
    initialState,
    reducers: {
        resetUserState: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(updateUserName.pending, (state) => {
            state.loginStatus = "loading";
            state.error = null;
          })
          .addCase(updateUserName.fulfilled, (state, action) => {
            state.loginStatus = "succeeded";
            state.users = action.payload;
          })
          .addCase(updateUserName.rejected, (state, action) => {
            state.loginStatus = "failed";
            state.users = action.payload;
          });
    },
  });
  export const { updateUser } = updateUserSlice.actions;
  export default updateUserName.reducer;
    
  