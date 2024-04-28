import React from 'react'
import './RegisteredSuccessfully.css'
import greenTick from '../../Assets/Images/green-tick.png'
import { useNavigate } from 'react-router-dom'
import login from "../Login/Login"

export default function RegisteredSuccessfully() {
  var navigate=useNavigate()

  function login(){
    navigate('/login')
  }
  return (
    <div className='registration-body-div'>
      <div className='registration-msg-div'>
        <img src={greenTick} className='green-tick'/>
        <h3>Account Created Successflly</h3>
        <button onClick={login} className="login-here-btn">login</button>
      </div>
    </div>
  )
}
