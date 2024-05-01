import React, { useState } from 'react'
import'./ManageBookings.css'
import GetBookings from '../GetBookings/GetBookings';
import GetCancelBookings from '../GetCancelBookings/GetCancelBooking';
import mybooking from "./Images/Mybooking.png";
import useronline from "./Images/useronline.png"
export default function ManageBooking() {
    const [booking,setBooking]=useState(true)
  const [cancelBooking,setCancelBooking]=useState(false)

  return (
    <div>
      <div className="container-body">
        <div className="account-sidebar">
            <div className="sidebar-container">
            <div className="dashboard-heading">
            <img src={useronline} className="user-online" style={{ display: "block", height: "50%", width:"50%",marginBottom: "10px",marginLeft:"70px" }}/>
          <h2 style={{ fontSize: "20px", color: "white",textAlign: "center"}}>Dashboard</h2>
          </div>
            <div className="sidebar-option" onClick={()=>{
              setBooking(true);
              setCancelBooking(false);
            }}><div style={{ display: "flex", alignItems: "left", marginRight:"60px" }}>
            <img src={mybooking} alt="Profile" style={{ width: "20px", height: "20px", marginRight: "5px",opacity:"50px" }} /> Get Bookings</div>
            </div>
            <div className="sidebar-option" onClick={()=>{
              setBooking(false);
              setCancelBooking(true);
            }}><div style={{ display: "flex", alignItems: "left", marginRight:"20px" }}>
            <img src={mybooking} alt="Profile" style={{ width: "20px", height: "20px", marginRight: "5px",opacity:"50px" }} /> CancelledBookings</div>
            </div>
        </div>
        </div>
        <div className="container-main">
            {booking && <div className="get-bookings">
                <GetBookings/>
            </div>}
            {cancelBooking && <div className="cancel-bookings">
              <GetCancelBookings/>
            </div>}
        </div>
      </div>
    </div>
  )
}
