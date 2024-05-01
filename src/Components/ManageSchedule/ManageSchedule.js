import React, { useState } from 'react'
import './ManageSchedule.css'
import GetSchedule from '../GetSchedule/GetSchedule'
import AddSchedule from '../AddSchedule/AddSchedule';
import DeleteSchedule from '../DeleteSchedule/DeleteSchedule';
import UpdateSchedule from '../UpdateSchedule/UpdateSchedule';
import mybooking from "./Images/Mybooking.png";
import useronline from "./Images/useronline.png";

export default function ManageSchedule() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const [addSchedule,setAddSchedule]=useState(true)
  const [getSchedule,setGetSchedule]=useState(false)
  const [updateSchedule,setUpdateSchedule]=useState(false)
  const [deleteSchedule,setDeleteSchedule]=useState(false)

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <div>
    <div className="container-body">
      {sidebarVisible && <div className="account-sidebar" id='account-sidebar'>
          <div className="sidebar-container">
          <div className="dashboard-heading">
          <img src={useronline} className="user-online" style={{ display: "block", height: "50%", width:"50%",marginBottom: "10px",marginLeft:"70px" }}/>
        <h2 style={{ fontSize: "20px", color: "white",textAlign: "center"}}>Dashboard</h2>
        </div>
          <div className="sidebar-option" onClick={()=>{
            setAddSchedule(true);
            setGetSchedule(false);
            setUpdateSchedule(false)
            setDeleteSchedule(false)
          }}><div style={{ display: "flex", alignItems: "left", marginRight:"60px" }}>
          <img src={mybooking} alt="Profile" style={{ width: "20px", height: "20px", marginRight: "5px",opacity:"50px" }} /> AddSchedule</div>
          </div>
          <div className="sidebar-option" onClick={()=>{
            setAddSchedule(false);
            setGetSchedule(true);
            setUpdateSchedule(false)
            setDeleteSchedule(false)
          }}><div style={{ display: "flex", alignItems: "left", marginRight:"65px" }}>
          <img src={mybooking} alt="Profile" style={{ width: "20px", height: "20px", marginRight: "5px",opacity:"50px" }} /> GetSchedule</div>
          </div>
          <div className="sidebar-option" onClick={()=>{
            setAddSchedule(false);
            setGetSchedule(false);
            setUpdateSchedule(true)
            setDeleteSchedule(false)
          }}><div style={{ display: "flex", alignItems: "left", marginRight:"50px" }}>
          <img src={mybooking} alt="Profile" style={{ width: "20px", height: "20px", marginRight: "5px",opacity:"50px" }} /> Update Schedule</div>
          </div>
          <div className="sidebar-option" onClick={()=>{
            setAddSchedule(false);
            setGetSchedule(false);
            setUpdateSchedule(false)
            setDeleteSchedule(true)
          }}><div style={{ display: "flex", alignItems: "left", marginRight:"50px" }}>
          <img src={mybooking} alt="Profile" style={{ width: "20px", height: "20px", marginRight: "5px",opacity:"50px" }} /> Delete Schedule</div>
          </div>
      </div>
      </div>}
      <div className="container-main">
      <div className='options-div' id='options-div'><u><h4 onClick={toggleSidebar}>options</h4></u></div>
          {addSchedule && <div className="add-schedule">
              <AddSchedule/>
          </div>}
          {getSchedule && <div className="get-schedule">
              <GetSchedule/>
          </div>}
          {updateSchedule && <div className="update-schedule">
<UpdateSchedule/>
          </div>}
          {deleteSchedule && <div className="delete-schedule">
<DeleteSchedule/>
          </div>}
      </div>
    </div>
  </div>
  )
}
