import React, { useState } from 'react'
import './ManageFlight.css'
import Navbar from '../Navbar/Navbar'
import GetFlight from '../GetFlight/GetFlight'
import AddFlight from '../AddFlight/AddFlight'
import UpdateFlight from '../UpdateFlight/UpdateFlight'
import DeleteFlight from '../DeleteFlight/DeleteFlight'
import rightArrow from '../../Assets/Images/right-arrow.png'
import leftArrow from '../../Assets/Images/left-arrow.png'

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
        <div className="sidebar" id='manage-flight-sidebar'>
            <div className="sidebar-container">
            <div className="more-profile-option"><img src={leftArrow} className="right-arrow" onClick={DisplayMain}/></div>
            <div className="sidebar-options" onClick={()=>{
              setAddFlight(true);
              setGetFlight(false);
              setUpdateFlight(false)
              setDeleteFlight(false)
            }}style={{
              backgroundColor: "#dddddc", // Red color
              color: "black",
              padding: "10px",
              marginBottom: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s" // Smooth transition
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#848484"} // Darken color on hover
            onMouseLeave={(e) => e.target.style.backgroundColor = "#dddddc"} >
                Add Flight
            </div>
            <div className="sidebar-options" onClick={()=>{
              setAddFlight(false);
              setGetFlight(true);
              setUpdateFlight(false)
              setDeleteFlight(false)
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
                Get Flights
            </div>
            <div className="sidebar-options" onClick={()=>{
              setAddFlight(false);
              setGetFlight(false);
              setUpdateFlight(true)
              setDeleteFlight(false)
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
                Update Flight
            </div>
            <div className="sidebar-options" onClick={()=>{
              setAddFlight(false);
              setGetFlight(false);
              setUpdateFlight(false)
              setDeleteFlight(true)
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
                Remove Flight
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
    </div>
  )
}
