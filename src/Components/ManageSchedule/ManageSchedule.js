import React, { useState } from 'react'
import './ManageSchedule.css'
import GetSchedule from '../GetSchedule/GetSchedule'
import AddSchedule from '../AddSchedule/AddSchedule';
import DeleteSchedule from '../DeleteSchedule/DeleteSchedule';
import UpdateSchedule from '../UpdateSchedule/UpdateSchedule';

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
        {sidebarVisible && <div className="sidebar" id='sidebar'>
            <div className="sidebar-container">
            <div className="sidebar-options" onClick={()=>{
              setAddSchedule(true);
              setGetSchedule(false);
              setUpdateSchedule(false)
              setDeleteSchedule(false)
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
                Add Schedule
            </div>
            <div className="sidebar-options" onClick={()=>{
              setAddSchedule(false);
              setGetSchedule(true);
              setUpdateSchedule(false)
              setDeleteSchedule(false)
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
                Get Schedules
            </div>
            <div className="sidebar-options" onClick={()=>{
              setAddSchedule(false);
              setGetSchedule(false);
              setUpdateSchedule(true)
              setDeleteSchedule(false)
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
                Update Schedule
            </div>
            <div className="sidebar-options" onClick={()=>{
              setAddSchedule(false);
              setGetSchedule(false);
              setUpdateSchedule(false)
              setDeleteSchedule(true)
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
                Remove Schedule
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
