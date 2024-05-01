import logo from "./logo.svg";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import HomeComponent from "./Components/Home/HomeComponent";
import AboutPage from "./Components/AboutPage/AboutPage";
import Login from "./Components/Login/Login";
import Error from "./Components/Error/Error";
import RegisterFlightOwner from "./Components/RegisterFlightOwner/RegisterFlightOwner";
import FlightOwnerHome from "./Components/FlightOwnerHome/FlightOwnerHome";
import ManageFlight from "./Components/ManageFlight/ManageFlight";
import ManageRoute from "./Components/ManageRoute/ManageRoute";
import ManageSchedule from "./Components/ManageSchedule/ManageSchedule";
import NavMenu from "./Components/Navbar/NavMenu";
import SearchedFlightResult from "./Components/SearchedFlightResult/SearchedFlightResult";
import PrivateRoute from '../src/Components/PrivateRoute/PrivateRoute'
import BookingDetails from "./Components/BookingDetails/BookingDetails";
import SeatLayout from "./Components/SeatLayout/SeatLayout";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import ManageUser from "./Components/ManageUsers/ManageUser";
import RegisterUser from "./Components/RegisterUser/RegisterUser";
import RegisteredSuccessfully from "./Components/RegisteredSuccessfullyMsg/RegisteredSuccessfully";
import RegisterAdmin from "./Components/RegisterAdmin/RegisterAdmin";
import UserAccount from "./Components/UserAccount/UserAccount";
import CustomerBookingHistory from "./Components/CustomerBookings/CustomerBookingHistory";
import ManageBooking from "./Components/ManageBookings/ManageBooking";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<HomeComponent />} />
          <Route path="home" element={<HomeComponent />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="login" element={<Login />} />
          <Route path="updatePassword" element={<UpdatePassword/>}/>
          <Route path="registerUser" element={<RegisterUser/>}/>
          <Route path="registerAdmin" element={<RegisterAdmin/>}/>
          <Route path="register" element={<RegisterFlightOwner />} />
          <Route path="registeredSuccessfully" element={<RegisteredSuccessfully />} />
          <Route path="navMenu" element={<NavMenu />} />
          <Route path="searchFlightResult" element={<SearchedFlightResult />} />
          <Route path="user/" element={<PrivateRoute/>}>
            <Route path="bookingDetails" element={<BookingDetails />} />
            <Route path="seatBooking" element={<SeatLayout/>}/>
            <Route path="userAccount" element={<UserAccount/>}/>
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="/flightOwner/" element={<PrivateRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="home" element={<FlightOwnerHome />} />
            <Route path="manageFlight" element={<ManageFlight />} />
            <Route path="manageRoute" element={<ManageRoute />} />
            <Route path="manageSchedule" element={<ManageSchedule />} />
            <Route path="manageBooking" element={<ManageBooking/>}/>
        </Route>
        <Route path="/admin/" element={<PrivateRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="home" element={<AdminDashboard />} />
            <Route path="manageUser" element={<ManageUser/>}/>
        </Route> 
      </Routes>
    </BrowserRouter>
  );
}

const HomeContainer = () => {
  return (
    <div style={{ height: "100vh", overflowY: "auto" }}>
      <HomeComponent />
    </div>
  );
};

export default App;
