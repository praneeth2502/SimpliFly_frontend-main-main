import React, { useState } from 'react'
import'./ManageBookings.css'
import GetBookings from '../GetBookings/GetBookings'
import GetCancelBookings from '../GetCancelBookings/GetCancelBookings'

export default function ManageBooking() {
    const [booking,setBooking]=useState(true)
  const [cancelBooking,setCancelBooking]=useState(false)

  return (
    <div>
      <div className="container-body">
        <div className="sidebar manage-booking-sidebar">
            <div className="sidebar-container">
            <div className="sidebar-options booking-btn-div" onClick={()=>{
              setBooking(true);
              setCancelBooking(false);
            }}style={{
              backgroundColor: "#dddddc", // Red color
              color: "black",
              padding: "10px",
              marginBottom: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s" // Smooth transition
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#848484"} // Darken color on hover
            onMouseLeave={(e) => e.target.style.backgroundColor = "#dddddc"}>
                Get Bookings
            </div>
            <div className="sidebar-options cancel-booking-btn-div" onClick={()=>{
              setBooking(false);
              setCancelBooking(true);
            }}style={{
              backgroundColor: "#dddddc", // Red color
              color: "black",
              padding: "10px",
              marginBottom: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s" // Smooth transition
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#848484"} // Darken color on hover
            onMouseLeave={(e) => e.target.style.backgroundColor = "#dddddc"}>
                Cancel Bookings
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
