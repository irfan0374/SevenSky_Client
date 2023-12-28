import { createSlice } from "@reduxjs/toolkit";

const partnerSlice=createSlice({
    name:"partner",
    initialState:{
        partner:null,
        token:"",
        propertystate : null,
    },
    reducers:{
        partnerLogin:(state,action)=>{
            state.token=action.payload.token
            state.partner=action.payload.partner
        },
        partnerLogout:(state)=>{
           
            state.partner={
                token:"",
                partner:null
            };
        },
        addPropertyState: (state, action) => {
            state.propertystate=action.payload;
          },

    }
});
export const {partnerLogin,partnerLogout,addPropertyState}=partnerSlice.actions
export default partnerSlice.reducer