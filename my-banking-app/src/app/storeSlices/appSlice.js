import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    users: [],
    
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        
    },
});
export const { setUsers, setTransactions } = appSlice.actions;
export default appSlice.reducer;