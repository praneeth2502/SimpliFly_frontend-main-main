import { createSlice } from "@reduxjs/toolkit";

const SelectedSeatSlice = createSlice({
    name: 'selectedSeats',
    initialState: [],
    reducers: {
        addSeats: (state, action) => {
            return action.payload.selectedSeats;
        },
    },
});

export const {addSeats}=SelectedSeatSlice.actions
export default SelectedSeatSlice.reducer