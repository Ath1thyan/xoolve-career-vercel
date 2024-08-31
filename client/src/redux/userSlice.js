import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    reloadUser: true,
    otherUsers:null,
    selectedUser:null,
    onlineUsers:null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setOtherUsers:(state, action)=>{
            state.otherUsers = action.payload;
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser = action.payload;
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers = action.payload;
        }
    }
});

export const { setUser, setOtherUsers, setSelectedUser, setOnlineUsers } = userSlice.actions;