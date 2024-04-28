import { createSlice } from "@reduxjs/toolkit";

const PassengerSlice = createSlice({
    name: 'passengerIds',
    initialState: [],
    reducers: {
        addPassenger: (state, action) => {
            return action.payload.passengerIds;
        },
    },
});

export const {addPassenger}=PassengerSlice.actions
export default PassengerSlice.reducer