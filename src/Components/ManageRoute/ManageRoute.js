import React, { useState } from 'react'
import './ManageRoute.css'
import GetRoute from '../GetRoute/GetRoute'
import AddRoute from '../AddRoute/AddRoute'
import DeleteRoute from '../DeleteRoute/DeleteRoute'
import rightArrow from '../../Assets/Images/right-arrow.png'
import leftArrow from '../../Assets/Images/left-arrow.png'
import useronline from "./Images/useronline.png";
import mybooking from "./Images/Mybooking.png";

export default function ManageRoute() {
  const [addRoute,setAddRoute]=useState(true)
  const [getRoute,setGetRoute]=useState(false)
  const [deleteRoute,setDeleteRoute]=useState(false)
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
            <div className="sidebar-container">
            <div className="dashboard-heading">
            <img src={useronline} className="user-online" style={{ display: "block", height: "50%", width:"50%",marginBottom: "10px",marginLeft:"70px" }}/>
          <h2 style={{ fontSize: "20px", color: "white",textAlign: "center"}}>Dashboard</h2>
          </div>
          <div className="more-profile-option"><img src={leftArrow} className="right-arrow" onClick={DisplayMain}/></div>
            <div className="sidebar-option" onClick={()=>{
              setAddRoute(true);
              setGetRoute(false);
              setDeleteRoute(false);
            }}><div style={{ display: "flex", alignItems: "left", marginRight:"70px" }}>
            <img src={mybooking} alt="Profile" style={{ width: "20px", height: "20px", marginRight: "5px",opacity:"50px" }} /> Add Route</div>
            </div>
            <div className="sidebar-option" onClick={()=>{
              setAddRoute(false);
              setGetRoute(true);
              setDeleteRoute(false);
            }}><div style={{ display: "flex", alignItems: "left", marginRight:"70px" }}>
            <img src={mybooking} alt="Profile" style={{ width: "20px", height: "20px", marginRight: "5px",opacity:"50px" }} /> Get Route</div>
            </div>
            
            <div className="sidebar-option" onClick={()=>{
              setAddRoute(false);
              setGetRoute(false);
              setDeleteRoute(true);
            }}><div style={{ display: "flex", alignItems: "left", marginRight:"70px" }}>
            <img src={mybooking} alt="Profile" style={{ width: "20px", height: "20px", marginRight: "5px",opacity:"50px" }} /> Remove Route</div>
            </div>
        </div>
        </div>
        <div className="container-main">
            {addRoute && <div className="add-routes">
                <AddRoute/>
            </div>}
            {getRoute && <div className="get-routes">
                <GetRoute/>
            </div>}
            {deleteRoute && <div className="delete-routes">
              <DeleteRoute/>
            </div>}
        </div>
      </div>
    </div>
  )
}
