import React, { useState } from "react";
import "./RegisterFlightOwner.css";
import userimg from '../../Assets/Images/user.png'
import keyimg from '../../Assets/Images/key.png'
import RegisteredSuccessfully from "../RegisteredSuccessfullyMsg/RegisteredSuccessfully";
import Registeruserimg from "./Images/image.png";


export default function RegisterFlightOwner() {

  const [displayUsernamePasswordDiv, setDisplayUsernamePassword] = useState(true);
  const [displayOtherDetailsDiv, setDisplayOtherDetailsDiv] = useState(false);
  const [registerMessage, setRegisterMessage] = useState(false);

  var [username,setUsername]=useState("");
  var [password,setPassword]=useState("");
  var [confirmPassword,setConfirmPassword]=useState("");
  var [name,setName]=useState("");
  var [email,setEmail]=useState("");
  var [companyName,setCompanyName]=useState("");
  var [contactNumber,setContactNumber]=useState("");
  var [address,setAddress]=useState("");
  var [businessRegistration,setBusinessRegistration]=useState("");  

  var flightOwner={}
  var Register =(e)=>{
    if(!name || !email || !contactNumber){
      alert("Enter all required details")
    }
    e.preventDefault();
    flightOwner.username=username;
    flightOwner.password=password;
    flightOwner.name=name;
    flightOwner.email=email;
    flightOwner.companyName=companyName;
    flightOwner.contactNumber=contactNumber;
    flightOwner.address=address;
    flightOwner.businessRegistrationNumber=businessRegistration;
    console.log(flightOwner);
    var RequestOption ={
      method : 'POST',
      headers : {'Content-type':'application/json'},
      body : JSON.stringify(flightOwner)
    }

    fetch("http://localhost:5256/api/User/RegisterFlightOwner",RequestOption)
      .then(res=>res.json())
      .then(res=>{
        console.log(res)
        setRegisterMessage(true)
      })
      .catch(err=>{console.log(err)
        alert("User already present")})
  }


  function DisplayUsernamePassword() {
    setDisplayUsernamePassword(true);
    setDisplayOtherDetailsDiv(false);
  }

  function DisplayOtherDetails() {
    if(!username || !password){
      alert("Please enter username and password");
      return;
    }
    if(password!=confirmPassword){
      alert("Password and confirm password does not matched")
      return;
    }
    setDisplayOtherDetailsDiv(true);
    setDisplayUsernamePassword(false);
  }

  function Register() {}
  return (
    <div>
      <div className="register-page">
        <div className="register-div">
          <h3>Register as Flight Owner</h3>
          <img src={Registeruserimg} className="register-image"/>
            {displayUsernamePasswordDiv && <div className="username-password-div" id="username-password-div">
            <div className="username-div">
                <img src={userimg}/>
                <input type="text" id="username-input" placeholder="Enter your username" className="register-inputs" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
            </div>
            <div className="password-div">
                <img src={keyimg}/>
                <input type="password" id="password-input" placeholder="Enter your password" className="register-inputs" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            <div className="re-enter-password-div">
                <img src={keyimg}/>
                <input type="password" id="passwords-input" placeholder="Re-enter password" className="register-inputs" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required/>
            </div>
            <button className="next-btn" onClick={DisplayOtherDetails}>Next</button>
            </div>}
            {displayOtherDetailsDiv && <div className="other-details-div" id="other-details-div">
            <div className="name-div">
                <label htmlFor="name"style={{ fontSize: '16px', fontWeight: 'bold'  }}>Name:</label>
                <input type="text" id="name-input" placeholder="Enter your name" className="register-inputs"
                value={name} onChange={(e)=>setName(e.target.value)} required/>
            </div>
            <div className="email-div">
                <label htmlFor="email"style={{ fontSize: '16px', fontWeight: 'bold'  }}>Email:</label>
                <input type="text" id="email-input" placeholder="Enter your email" className="register-inputs"
                value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div className="company-div"style={{ fontSize: '16px', fontWeight: 'bold'  }}>
                <label htmlFor="company">Company:</label>
                <input type="text" id="company-input" placeholder="Enter your company" className="register-inputs"
                value={companyName} onChange={(e)=>setCompanyName(e.target.value)}/>
            </div>
            <div className="contact-div"style={{ fontSize: '16px', fontWeight: 'bold'  }}>
                <label htmlFor="contact">Contact:</label>
                <input type='tel' id="contact-input" placeholder="Enter your contact" className="register-inputs"
                value={contactNumber} onChange={(e)=>setContactNumber(e.target.value)} required/>
            </div>
            <div className="address-div"style={{ fontSize: '16px', fontWeight: 'bold'  }}>
                <label htmlFor="address">Address:</label>
                <input type='text' id="address-input" placeholder="Enter your address" className="register-inputs"
                value={address} onChange={(e)=>setAddress(e.target.value)}/>
            </div>
            <div className="registration-number-div">
                <label htmlFor="registration-number"style={{ fontSize: '16px', fontWeight: 'bold'  }}>BusinessNumber:</label>
                <input type='text' id="registration-number-input" placeholder="Enter your business-registration-number" className="register-inputs" value={businessRegistration} onChange={(e)=>setBusinessRegistration(e.target.value)}  required/>
            </div>
            <div className="btns">
            <button className="back-btn" onClick={DisplayUsernamePassword}>Back</button>
            <button value="Register" id="register-btn" onClick={Register}>Register</button>
            </div>
            </div>}
        </div>
      {registerMessage && <RegisteredSuccessfully className="register-successfully-div"/>}
      </div>
    </div>
  );
}
