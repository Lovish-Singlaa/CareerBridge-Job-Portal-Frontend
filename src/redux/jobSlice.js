import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({  
    name: "job",
    initialState: {
        allJobs:[],
        singleJob: null,
        recruiterJobs: [],
        searchJobs: "",
        allAppliedJobs: [],
        searchedQuery: ""
    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs = action.payload
        },
        setJobById:(state,action)=>{
            state.singleJob = action.payload
        },
        setRecruiterJobs: (state,action)=>{
            state.recruiterJobs = action.payload
        },
        setSearchJobs: (state,action)=>{
            state.searchJobs = action.payload
        },
        setAllAppliedJobs: (state,action)=>{
            state.allAppliedJobs = action.payload
        },
        setSearchedQuery: (state,action)=>{
            state.searchedQuery = action.payload
        }
    }
})
export const {setAllJobs,setJobById, setRecruiterJobs, setSearchJobs, setAllAppliedJobs, setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer 