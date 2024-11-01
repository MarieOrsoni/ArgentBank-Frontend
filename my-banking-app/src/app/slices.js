import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "./Token.js";

// Initial states
const appInitialState = {
  users: [],
  transactions: [],
  loginStatus: "idle",
  error: null,
};

const dataInitialState = {
  items: [],
  status: "idle",
  error: null,
};

const authInitialState = {
  token: [],
};


// Thunk to handle login verification
export const loginUser = createAsyncThunk(
  "app/loginUser",
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
//user signup
export const fetchUserInfo = createAsyncThunk(
  "app/fetchUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      console.log("Token being used:", token);
      if (!token) {
        return rejectWithValue("Token is missing, please log in.");
      }
      const response = await api.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}`},
      });
      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchData = createAsyncThunk("data/fetchData", 
  async (_, {rejectWithValue}) => {
    try {
      const token = localStorage.getItem("authToken");
      if(!token) {
        return rejectWithValue("Token is missing, no fetch data");
      }
  const response = await api.get("/data-endpoint", {
    headers: { Authorization: `Bearer ${token}`}
  });
  return response.data;
} catch (error) {
  return rejectWithValue(error.message);
}
  }
);

export const updateUserName = createAsyncThunk(
  "app/updateUserName",
  async (updateData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.get("/user/profile", {
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
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const authSlice = createSlice({
  name: "authToken",
  initialState: authInitialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      
    });
  },
});

const appSlice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
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
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload;
      })
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

const dataSlice = createSlice({
  name: "data",
  initialState: dataInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const rootReducer = {
  authToken: authSlice.reducer,
  app: appSlice.reducer,
  data: dataSlice.reducer,

};
export const { setToken } = authSlice.actions;
export const { setUsers, setTransactions } = appSlice.actions;
export default rootReducer;
