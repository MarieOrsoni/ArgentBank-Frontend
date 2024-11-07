import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./loginSlice.js";
import appReducer from "./appSlice.js";
import updateNameReducer from "./updateUserSlice.js";
import useReducer from "./userSlice.js";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  user: useReducer,
  updateName: updateNameReducer,
});

export default rootReducer;
