
import { createSlice } from "@reduxjs/toolkit";
import { currentUserType } from "../../Type/type";



type InitialStateType = {
    adminStatus: boolean;
    adminLoading: boolean;
    error: boolean | null;
    userDetails: currentUserType[];
  
  };
  
  const initialState: InitialStateType = {
    adminStatus: false,
    adminLoading: false,
    error: false,
    userDetails: [],
  
  };
  
  const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
      adminSignInStart: (state) => {
        state.adminLoading = true;
      },
      adminSignInSuccess: (state, action) => {
        state.adminStatus = true; // Set to true on successful login
        state.adminLoading = false;
        state.error = null;
        state.userDetails = action.payload; // Assuming payload contains user details
      },
      adminSignInFailure: (state, action) => {
        state.adminLoading = false;
        state.error = action.payload;
        state.adminStatus = false;
    },
    fetchUserDetailsStart: (state) => {
      state.adminLoading = true;
    },
    fetchUserDetailsSuccess: (state, action) => {
      state.userDetails = Array.isArray(action.payload) ? action.payload : [];
      state.adminLoading = false;
      state.error = false;
    },
    fetchUserDetailsFailure: (state, action) => {
      state.adminLoading = false;
      state.error = action.payload;
    },

    deleteUserStart:(state)=>{
        state.adminLoading=true;
    },
    deleteUserSuccess:(state,action)=>{
        state.userDetails=state.userDetails.filter((user:currentUserType)=>user._id !==action.payload)
        state.adminLoading=false;
      
    },
    deleteUserFailure:(state,action)=>{
        state.adminLoading=false;
        state.error=action.payload;
    },
  }});
  
  export const {
    adminSignInStart,
    adminSignInSuccess,
    adminSignInFailure,
    fetchUserDetailsStart,
    fetchUserDetailsSuccess,
    fetchUserDetailsFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,

    
  } = adminSlice.actions;
  export default adminSlice.reducer;
  