import { createSlice } from "@reduxjs/toolkit";

const selectedFlightSlice = createSlice({
  name: 'selectedFlight',
  initialState: {},
  reducers: {
    addSelectedFlight: (state, action) => {
      state.flightNumber= action.payload.flightNumber;
      state.sourceAirport= action.payload.sourceAirport;
      state.destinationAirport= action.payload.destinationAirport;
      state.departureTime= action.payload.departureTime;      
      state.arrivalTime= action.payload.arrivalTime;     
      state.scheduleId= action.payload.scheduleId;           
      state.totalPrice= action.payload.totalPrice;
      state.airline=action.payload.airline;
    }
  }
});

export const { addSelectedFlight } = selectedFlightSlice.actions;
export default selectedFlightSlice.reducer;
