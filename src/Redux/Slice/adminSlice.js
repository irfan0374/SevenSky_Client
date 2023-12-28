import { createSlice } from "@reduxjs/toolkit";
const adminSlice=createSlice({
    name:"admin",
    initialState:{
        admin:null,
        token:""
    },
    reducers:{
        adminLogin:(state,action)=>{
            state.token=action.payload.token
            state.admin=action.payload.token
        },
        adminLogout:(state)=>{
            state.admin={
                token:"",
                admin:null
            }
        }

    }
})
export const {adminLogin,adminLogout}=adminSlice.actions
export default adminSlice.reducer