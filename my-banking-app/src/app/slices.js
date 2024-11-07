import { createSlice, createAsyncThunk, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Services/loginSlice.js";
import appReducer from "./Services/appSlice.js";
import useReducer  from "./Services/userSlice.js";

import api from "./Token.js";


// Initial states
/*const appInitialState = {
  users: [],
  transactions: [],
  loginStatus: "idle",
  error: null,
};*/

const dataInitialState = {
  items: [],
  status: "idle",
  error: null,
};

/*const authInitialState = {
  token: [],
};*/


// Thunk to handle login verification
/*export const loginUser = createAsyncThunk(
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
);*/


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



/*const authSlice = createSlice({
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
});*/

/*const appSlice = createSlice({
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
    
     
  },
});*/

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

const rootReducer = combineReducers ({
  auth: authReducer,
  app: appReducer,
  data: dataSlice.reducer,
  user: useReducer,
  
  
});

export default rootReducer;
