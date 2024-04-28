import React, { useState } from 'react'
import './ManageRoute.css'
import GetRoute from '../GetRoute/GetRoute'
import AddRoute from '../AddRoute/AddRoute'
import DeleteRoute from '../DeleteRoute/DeleteRoute'

export default function ManageRoute() {
  const [addRoute,setAddRoute]=useState(true)
  const [getRoute,setGetRoute]=useState(false)
  const [deleteRoute,setDeleteRoute]=useState(false)
  return (
    <div>
      <div className="container-body">
        <div className="sidebar">
            <div className="sidebar-container">
            <div className="sidebar-options" onClick={()=>{
              setAddRoute(true);
              setGetRoute(false);
              setDeleteRoute(false);
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
                Add Route
            </div>
            <div className="sidebar-options" onClick={()=>{
              setAddRoute(false);
              setGetRoute(true);
              setDeleteRoute(false);
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
                Get Routes
            </div>
            
            <div className="sidebar-options" onClick={()=>{
              setAddRoute(false);
              setGetRoute(false);
              setDeleteRoute(true);
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
                Remove Route
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
