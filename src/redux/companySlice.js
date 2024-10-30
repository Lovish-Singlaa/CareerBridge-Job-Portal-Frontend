import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:'company',
    initialState:{
        singleCompany:null,
        companies:[],
        searchCompanies: ""
    },
    reducers:{
        setSingleCompany:(state,action)=>{
            state.singleCompany = action.payload
        },
        setCompanies:(state,action)=>{
            state.companies = action.payload
        },
        setSearchCompanies:(state,action)=>{
            state.searchCompanies = action.payload
        }
    }    
});
export const {setSingleCompany, setCompanies, setSearchCompanies} = companySlice.actions;
export default companySlice.reducer;