import React, { useState } from 'react'
import './ManageFlight.css'
import Navbar from '../Navbar/Navbar'
import GetFlight from '../GetFlight/GetFlight'
import AddFlight from '../AddFlight/AddFlight'
import UpdateFlight from '../UpdateFlight/UpdateFlight'
import DeleteFlight from '../DeleteFlight/DeleteFlight'
import rightArrow from '../../Assets/Images/right-arrow.png'
import leftArrow from '../../Assets/Images/left-arrow.png'
import useronline from "./Images/useronline.png";
import mybooking from "./Images/Myboooking.png";

export default function ManageFlight() {
  const [addFlight,setAddFlight]=useState(true)
  const [getFlight,setGetFlight]=useState(false)
  const [updateFlight,setUpdateFlight]=useState(false)
  const [deleteFlight,setDeleteFlight]=useState(false)

  function DisplayOptions(){
    var sidebar=document.getElementById('manage-flight-sidebar');
    var mainContainer=document.getElementById('container-main')
    sidebar.style.display="flex"
    mainContainer.style.display="none"
  }
  function DisplayMain(){
    var sidebar=document.getElementById('manage-flight-sidebar');
    var mainContainer=document.getElementById('container-main')
    sidebar.style.display="none"
    mainContainer.style.display="flex"
  }

  return (
    <div>
    <div className="container-body">
      <div className="account-sidebar" id='account-sidebar'>
      <div className='sidebar-container'>
      <div className="dashboard-heading">
          <img src={useronline} className="user-online" style={{ display: "block", height: "50%", width:"50%",marginBottom: "10px",marginLeft:"70px" }}/>
        <h2 style={{ fontSize: "20px", color: "white",textAlign: "center"}}>Dashboard</h2>
        </div>
          <div className="more-profile-option"><img src={leftArrow} className="right-arrow" onClick={DisplayMain}/></div>
          <div className="sidebar-option" onClick={()=>{
            setAddFlight(true);
            setGetFlight(false);
            setUpdateFlight(false)
            setDeleteFlight(false)
          }}><div style={{ display: "flex", alignItems: "left", marginRight:"70px" }}>
          <img src={mybooking} alt="Profile" style={{ width: "20px", height: "20px", marginRight: "5px",opacity:"50px" }} /> AddFlight</div>
          </div>
          <div className="sidebar-option" onClick={()=>{
            setAddFlight(false);
            setGetFlight(true);
            setUpdateFlight(false)
            setDeleteFlight(false)
          }}><div style={{ display: "flex", alignItems: "left", marginRight:"40px" }}>
          <img src={mybooking} alt="Profile" style={{ width: "20px", height: "20px", marginRight: "5px",opacity:"50px" }} /> Get Flights</div>
          </div>
          <div className="sidebar-option" onClick={()=>{
            setAddFlight(false);
            setGetFlight(false);
            setUpdateFlight(true)
            setDeleteFlight(false)
          }}><div style={{ display: "flex", alignItems: "left", marginRight:"40px" }}>
          <img src={mybooking} alt="Profile" style={{ width: "20px", height: "20px", marginRight: "5px",opacity:"50px" }} /> UpdateFlight</div>
          </div>
          <div className="sidebar-option" onClick={()=>{
            setAddFlight(false);
            setGetFlight(false);
            setUpdateFlight(false)
            setDeleteFlight(true)
          }}><div style={{ display: "flex", alignItems: "left", marginRight:"40px" }}>
          <img src={mybooking} alt="Profile" style={{ width: "20px", height: "20px", marginRight: "5px",opacity:"50px" }} /> DeleteFlight</div>
          </div>
          </div>
      </div>
      </div>
      <div className="container-main" id='container-main'>
      <div className="more-profile-option"><img src={rightArrow} className="right-arrow" onClick={DisplayOptions}/></div>
          {addFlight && <div className="add-flight">
              <AddFlight/>
          </div>}
          {getFlight && <div className="get-flight">
              <GetFlight/>
          </div>}
          {updateFlight && <div className="update-flight">
              <UpdateFlight/>
          </div>}
          {deleteFlight && <div className="delete-flight">
              <DeleteFlight/>
          </div>}
      </div>
    </div>
  )
}
