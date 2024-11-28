
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
    editUserStart: (state) => {
      state.error = false;
      state.adminLoading = true;
    },
    editUserSuccess: (state, action) => {
      state.userDetails = state.userDetails.map((user: currentUserType) =>
        user._id === action.payload.userDetail._id 
          ? { ...user, ...action.payload.userDetail } 
          : user
      );
      state.adminLoading = false;
    },
    editUserFailure: (state,action) => {
      state.error = action.payload;
      state.adminLoading = false;
    },
    updateUserSuccess: (state, action) => {
      const updatedUser = action.payload;
      state.userDetails = state.userDetails.map(user =>
        user._id === updatedUser._id ? updatedUser : user
      );
    },
    addUserStart: (state) => {
      state.error = false;
      state.adminLoading = true;
    },
    addUserSuccess: (state, action) => {
     
      state.adminLoading = false;
      state.userDetails=[action.payload.newUser,...state.userDetails]
    },
    addUserFailure: (state,action) => {
      state.error = action.payload;
      state.adminLoading = false;
    },
    adminSignOut: (state) => {
      state.adminStatus = false;
      state.adminLoading = false;
      state.error = false;
      state.userDetails = [];  
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
    editUserStart,
    editUserSuccess,
    editUserFailure,
    updateUserSuccess,
    addUserStart,
    addUserFailure,
    addUserSuccess,
    adminSignOut

    
  } = adminSlice.actions;
  export default adminSlice.reducer;
  