import { createSlice } from "@reduxjs/toolkit";

const searchFlightResultSlice = createSlice({
  name: 'searchFlightResult',
  initialState: [],
  reducers: {
    addSearchFlightResult: (state, action) => {
      return action.payload.searchFlightResult;
    }
  }
});

export const { addSearchFlightResult } = searchFlightResultSlice.actions;
export default searchFlightResultSlice.reducer;
