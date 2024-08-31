import { createSlice } from "@reduxjs/toolkit";

export const bidSlice = createSlice({
    name:'bid',
    initialState:{
        applicants:null,
    },
    reducers:{
        setAllApplicants:(state,action) => {
            state.bids = action.payload;
        }
    }
});
export const {setAllApplicants} = bidSlice.actions;
// export default bidSlice.reducer;