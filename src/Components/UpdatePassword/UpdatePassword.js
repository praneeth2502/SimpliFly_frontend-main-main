import React, { useState } from "react";
import background from "../../Assets/Images/plane.jpg";
import userimg from "../../Assets/Images/user.png";
import keyimg from "../../Assets/Images/key.png";
import './UpdatePassword.css'
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
  var [username, setUsername] = useState("");
  var [password, setPassword] = useState("");
  var [confirmPassword, setConfirmPassword] = useState("");
  var navigate=useNavigate();

  var userDetails={}
  function UpdatePassword(e){
    if(!username || !password || !confirmPassword){
      alert("Enter all details");
      return
    }
    if(password!=confirmPassword){
      alert("password and confirm password does not match") 
      return
    }
    e.preventDefault();
    userDetails.username=username;
    userDetails.password=password;

    var RequestOption={
        method : 'PUT',
        headers : {'Content-Type':'application/json'},
        body: JSON.stringify(userDetails)
    }
    fetch("http://localhost:5256/api/User/UpdatePassword",RequestOption)
    .then(res=>res.json)
    .then((res)=>{
      alert("Password updated successfully")
      navigate('/login')
    })
  }

  return (
    <div>
      <div className="register-page">
        <img src={background} className="background-img" />
        <div className="register-div update-password-div">
          <h3>Update Password</h3>
          <div className="username-password-div" id="username-password-div">
            <div className="username-div">
              <img src={userimg} />
              <input
                type="text"
                id="username-input"
                placeholder="Enter your username"
                className="register-inputs"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="password-div">
              <img src={keyimg} />
              <input
                type="password"
                id="password-input"
                placeholder="Enter your password"
                className="register-inputs"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="re-enter-password-div">
              <img src={keyimg} />
              <input
                type="password"
                id="passwords-input"
                placeholder="Re-enter password"
                className="register-inputs"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button className="next-btn" onClick={UpdatePassword}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
