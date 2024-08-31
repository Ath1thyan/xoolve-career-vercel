import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
    name:"project",
    initialState:{
        allProjects:[],
        allAdminProjects:[],
        singleProject:null, 
        searchProjectByText:"",
        allBiddedProjects:[],
        searchedQuery:"",
    },
    reducers:{
        // actions
        setAllProjects:(state,action) => {
            state.allProjects = action.payload;
        },
        setSingleProject:(state,action) => {
            state.singleProject = action.payload;
        },
        setAllAdminProjects:(state,action) => {
            state.allAdminProjects = action.payload;
        },
        setSearchProjectByText:(state,action) => {
            state.searchProjectByText = action.payload;
        },
        setAllBiddedProjects:(state,action) => {
            state.allBiddedProjects = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        }
    }
});
export const {
    setAllProjects, 
    setSingleProject, 
    setAllAdminProjects,
    setSearchProjectByText, 
    setAllBiddedProjects,
    setSearchedQuery
} = projectSlice.actions;
export default projectSlice.reducer;