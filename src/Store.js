import { configureStore } from "@reduxjs/toolkit";
import searchFlightReducer from './SearchFlightSlice'
import searchFlightResultReducer from "./SearchFlightResultSlice";
import selectedFlightReducer from './SelectedFlightSlice';
import passengeReducer from './PassengerSlice';
import selectedSeatReducer from './SelectedSeatSlice'

const store=configureStore({
    reducer:{
        searchFlight:searchFlightReducer,
        searchFlightResult:searchFlightResultReducer,
        selectedFlight:selectedFlightReducer,
        passengerIds:passengeReducer,
        selectedSeats:selectedSeatReducer
    }
})

export default store