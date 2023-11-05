import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentUser : null,
    loading : false,
    error : false,
}
export const userSlice =  createSlice({
    name : "currentUser",
    initialState,
    reducers:{
        loginStart:(state)=>{
            state.loading =true
        },
        loginSuccess:(state,action)=>{
            state.loading = false
            state.currentUser=action.payload
        },
        loginFiler:(state)=>{
            state.loading = false
            state.error = true
        },
        logout:(state)=>{
            state.currentUser = null
            state.loading = false
            state.error = false
        }
        
    }
})


export const {loginFiler,loginStart,loginSuccess,logout} = userSlice.actions;

export default userSlice.reducer;