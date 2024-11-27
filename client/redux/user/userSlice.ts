
import { createSlice } from "@reduxjs/toolkit";
import { currentUserType } from "../../Type/type";


type initialType ={
    currentUser : currentUserType | null ,
    loading: boolean,
    error: boolean | string
}


const initialState:initialType = {
    currentUser:null,
    loading:false,
    error:false
};


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state,action) => {
            state.currentUser=action.payload
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state,action) => {
            state.loading = false;
            state.error = action.payload
        },
        updateUserStart: (state) => {
            state.loading = true
        },
        updateUserSuccess : (state,action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateUserFailure: (state,action) =>{
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { 
    signInStart, 
    signInSuccess, 
    signInFailure, 
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    
} = userSlice.actions;

export default userSlice.reducer;