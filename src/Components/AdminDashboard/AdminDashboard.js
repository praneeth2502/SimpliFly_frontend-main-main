import React from 'react'
import './AdminDashboard.css'
import { useNavigate } from 'react-router-dom'
import manageRoutesImg from "./Images/manageRoutesImg.png";
import ManageBookingImg from "./Images/manageBooking.png";
import AboutPage from "../AboutPage/AboutPage";
import Footer from "../Footer/Footer";



export default function AdminDashboard() {
    
  var username=sessionStorage.getItem('username')
  var navigate=useNavigate()

  return (
    <div>
      <div className="admin-home-main">
      </div>
      <div className='text'>
      <h3 style={{ marginLeft: '-800px', marginTop: '-50px' }}><span className="black">Hello </span><span className="black">{username}</span><span className="gold"> !!</span></h3>
  <h1><span className="black">BE THE </span><span className="gold">BEST PILOT</span><span className="black"> YOU CAN BE</span></h1>
  <h2><span className="black">- EMPLOYED BY THE </span><span className="gold">FINEST</span></h2>
      </div>
      <div className="child-div">
        <h1> </h1>
        <h4 style={{ fontSize: '44px', fontWeight: 'bold',color: '#a67a8e' }}>Services</h4>
        </div>
    <div className="child-div child-div-admin">
      <div className="owner-function" onClick={()=>navigate("/flightOwner/manageRoute")}>
        <img src={manageRoutesImg} className="fun-img"/>
        <h4>Manage Route</h4>
      </div>
    </div>
    <div className="child-div child-div-admin">
      <div className="owner-function" onClick={()=>navigate("/admin/manageUser")}>
        <img src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" className="fun-img"/>
        <h4>Manage Users</h4>
      </div>
    </div>
    <div className="child-div child-div-admin">
      <div className="owner-function" onClick={()=>navigate('/flightOwner/manageBooking')}>
      <img src={ManageBookingImg}className="fun-img"/>
      <h4>Manage Bookings</h4>
    </div>
    </div>
    <AboutPage/>
        <Footer/>
    </div>
  )
}
