import React, { useState } from "react";
import Profile from "../Profile/Profile";
import "./UserAccount.css";
import CustomerBooking from "../CustomerBookings/CustomerBooking";
import rightArrow from '../../Assets/Images/right-arrow.png'
import leftArrow from '../../Assets/Images/left-arrow.png'
import CancelledBookings from "../GetCancelBookingCustomer/GetCancelBooking"
import CustomerBookingHistory from "../CustomerBookings/CustomerBookingHistory";
import Footer from "../Footer/Footer";

import ProfileImg from "./Images/profile.png";
import useronline from "./Images/useronline.png";
import mybooking from "./Images/Mybooking.png";
import completedbooking from "./Images/bookinghistory.png";
import cancelledbookingImg from "./Images/cancelledbooking.png";



export default function UserAccount() {
  var [profile, setProfile] = useState(true);
  var [bookings, setBookings] = useState(false);
  var [bookingsHistory, setBookingHistory] = useState(false);
  var [cancelledBookings, setCancelledBookings] = useState(false); // Add state for CancelledBookings
  var userRole = sessionStorage.getItem("role");

  var [isCustomer, setIsCustomer] = useState(userRole=="customer");
  var [isFlightOwner, setIsFlightOwner] = useState(userRole=="flightOwner");
  var [isAdmin, setIsAdmin] = useState(userRole=="admin");

  function DisplayOptions(){
    var sidebar=document.getElementById('account-sidebar');
    var mainContainer=document.getElementById('container-main')
    sidebar.style.display="flex"
    mainContainer.style.display="none"
  }
  function DisplayMain(){
    var sidebar=document.getElementById('account-sidebar');
    var mainContainer=document.getElementById('container-main')
    sidebar.style.display="none"
    mainContainer.style.display="flex"
  }

  return (
    <div>
      <div className="container-body">
        <div className="sidebar account-sidebar" id="account-sidebar">
          <div className="sidebar-container">
          <div className="dashboard-heading">
            <img src={useronline} className="user-online" style={{ display: "block", height: "50%", width:"50%",marginBottom: "10px",marginLeft:"70px" }}/>
          <h2 style={{ fontSize: "20px", color: "white",textAlign: "center"}}>Dashboard</h2>
          </div>
            <div className="more-profile-option">
              <img src={leftArrow} className="right-arrow" onClick={DisplayMain} />
            </div>
            <div
              className="sidebar-option"
              onClick={() => {
                setProfile(true);
                setBookings(false);
                setBookingHistory(false);
                setCancelledBookings(false); // Ensure CancelledBookings is set to false
              }}
            ><div style={{ display: "flex", alignItems: "left", marginRight:"70px" }}>
            <img src={ProfileImg} alt="Profile" style={{ width: "20px", height: "20px", marginRight: "5px",opacity:"50px" }} /> Profile</div>
            </div>

            {isCustomer && (
              <div
                className="sidebar-option"
                onClick={() => {
                  setProfile(false);
                  setBookings(true);
                  setBookingHistory(false);
                  setCancelledBookings(false); // Ensure CancelledBookings is set to false
                }}
              ><div style={{ display: "flex", alignItems: "left", marginRight:"40px" }}>
              <img src={mybooking} alt="Profile" style={{ width: "20px", height: "20px", marginRight: "5px",opacity:"50px" }} /> My Bookings</div>
              </div>
            )}
            {isCustomer && (
              <div
                className="sidebar-option"
                onClick={() => {
                  setProfile(false);
                  setBookings(false);
                  setBookingHistory(true);
                  setCancelledBookings(false); // Ensure CancelledBookings is set to false
                }}
              ><div style={{ display: "flex", alignItems: "left" }}>
              <img src={completedbooking} alt="Profile" style={{ width: "20px", height: "20px", marginRight: "5px",opacity:"50px" }} /> Completed Booking</div>
              </div>
            )}
            {isCustomer && (
              <div
                className="sidebar-option"
                onClick={() => {
                  setProfile(false);
                  setBookings(false);
                  setBookingHistory(false);
                  setCancelledBookings(true); // Set CancelledBookings to true
                }}
              ><div style={{ display: "flex", alignItems: "left" }}>
              <img src={cancelledbookingImg} alt="Profile" style={{ width: "20px", height: "20px", marginRight: "5px",opacity:"50px",marginLeft:"10px" }} /> Cancelled Bookings</div>
              </div>
            )}
          </div>
        </div>
        <div className="container-main" id="container-main">
          <div className="more-profile-option">
            <img src={rightArrow} className="right-arrow" onClick={DisplayOptions} />
          </div>
          {profile && (
            <div className="get-User get-User-div ">
              <Profile />
            </div>
          )}
          {bookings && <div className="get-bookings"><CustomerBooking /></div>}
          {bookingsHistory && <div className="get-bookings-history"><CustomerBookingHistory /></div>}
          {cancelledBookings && <div className="get-cancelled-bookings"><CancelledBookings /></div>} {/* Render CancelledBookings if cancelledBookings state is true */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
