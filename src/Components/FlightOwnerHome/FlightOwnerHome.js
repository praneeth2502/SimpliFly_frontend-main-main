import React from 'react'
import './FlightOwnerHome.css'
import { useNavigate } from 'react-router-dom'
import AboutPage from "../AboutPage/AboutPage";
import Footer from "../Footer/Footer";
import manageFlightImg from "./Images/manageFlights.png";
import manageRoutesImg from "./Images/manageRoutesImg.png";
import ManageScheduleImg from "./Images/manageSchedule.png";
import ManageBookingImg from "./Images/manageBooking.png";
export default function FlightOwnerHome() {
  var navigate=useNavigate()
  var username=sessionStorage.getItem('username')
  return (
    <div>
      <div className="flight-owner-home-main">
      </div>
        <div className='text'>
          <h3 style={{ marginLeft: '-800px', marginTop: '-50px' }}><span className="black">Hello </span><span className="black">{username}</span><span className="gold"> !!</span></h3>
  <h1><span className="black">BE THE </span><span className="gold">BEST PILOT</span><span className="black"> YOU CAN BE</span></h1>
  <h2><span className="black">- EMPLOYED BY THE </span><span className="gold">FINEST</span></h2>
      </div>
      <div className="child-div">
        <h1> </h1>
        <h4 style={{ fontSize: '44px', fontWeight: 'bold',color: 'black' }}>Services</h4>
        </div>
        <div className="child-div">
          <div className="owner-function" onClick={()=>navigate("/flightOwner/manageFlight")}>
            <img src={manageFlightImg} className="fun-img"/>
            <h4>Manage Flights</h4>
          </div>
        </div>
        <div className="child-div">
          <div className="owner-function" onClick={()=>navigate("/flightOwner/manageRoute")}>
            <img src={manageRoutesImg} className="fun-img"/>
            <h4>Manage Route</h4>
          </div>
        </div>
        <div className="child-div">
          <div className="owner-function" onClick={()=>navigate("/flightOwner/manageSchedule")}>
            <img src={ManageScheduleImg} className="fun-img"/>
            <h4>Manage Schedules</h4>
          </div>
        </div>
        <div className="child-div">
          <div className="owner-function" onClick={()=>navigate('/flightOwner/manageBooking')}>
            <img src={ManageBookingImg} className="fun-img"/>
            <h4>Manage Bookings</h4>
          </div>
        </div>
        <AboutPage/>
        <Footer/>
      </div>
  )
}
