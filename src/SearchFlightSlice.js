import { createSlice } from "@reduxjs/toolkit";


const searchFlightSlice=createSlice({
    name:'searchFlight',
    initialState:{
        dateOfJourney: null,
        Origin: null,
    },
    reducers:{
        addSearchFlight:(state,action)=>{
            state.dateOfJourney = action.payload.dateOfJourney;
            state.Origin = action.payload.Origin;
            state.Destination=action.payload.Destination;
            state.Adult=action.payload.Adult;
            state.Child=action.payload.Child
            state.SeatClass=action.payload.SeatClass
        }
    }
})

export const{addSearchFlight}=searchFlightSlice.actions;
export default searchFlightSlice.reducer;