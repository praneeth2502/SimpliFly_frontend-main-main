import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
    var isLoggedIn=sessionStorage.getItem('token');
  return (
    isLoggedIn?<Outlet/>:<Navigate to='/login'/>
  )
}
