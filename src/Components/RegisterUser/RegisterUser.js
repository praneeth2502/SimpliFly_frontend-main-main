import React, { useState } from 'react'
import './RegisterUser.css'
import userimg from '../../Assets/Images/user.png'
import keyimg from '../../Assets/Images/key.png'
import RegisteredSuccessfully from "../RegisteredSuccessfullyMsg/RegisteredSuccessfully";
import Registeruserimg from "./Images/image.png";

export default function RegisterUser() {
    const [displayUsernamePasswordDiv, setDisplayUsernamePassword] = useState(true);
    const [displayOtherDetailsDiv, setDisplayOtherDetailsDiv] = useState(false);
    const [registerMessage, setRegisterMessage] = useState(false);

    var [username,setUsername]=useState("");
  var [password,setPassword]=useState("");
  var [confirmPassword,setConfirmPassword]=useState("");  
  var [role,setRole]=useState("customer")
  var [name,setName]=useState("");
  var [email,setEmail]=useState("");
  var [phone,setPhone]=useState("");
  var [gender,setGender]=useState("male")
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const validatename = (Name) => {
    if (!Name) {
      setNameError("Please enter a name");
      return false;
    } else if (/^[^a-zA-Z]/.test(Name)) {
      setNameError("Name should start with a letter");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };
  const validatepassword = (Password) => {
    if (!Password) {
      setPasswordError("Please enter a password");
      return false;
    } 
    else if(Password.length<6){
      setPasswordError("Password must be more than 6 character")
      return false;
    }
    else if (/^[a-zA-Z0-9]+$/.test(Password)) {
      setPasswordError("Password should be alphanumeric");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };
  var user={}
  
  var Register=(e)=>{
    if(!name || !email || !phone){
      alert("Enter all required details")
      return
    }
    
e.preventDefault();
user.username=username;
user.password=password;
user.role=role;
user.name=name;
user.email=email;
user.phone=phone;
user.gender=gender;

console.log(user);
var RequestOption ={
    method : 'POST',
    headers : {'Content-type':'application/json'},
    body : JSON.stringify(user)
  }

  fetch("http://localhost:5256/api/User",RequestOption)
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
    if (!validatename(username) || !validatepassword(password)){
      return
    }
    if(!username || !password){
      setFormError("Fill the above fields");
      return;
    }
    if(password!=confirmPassword){
      setFormError("Password and confirm password does not matched")
      return;
    }
    
    setFormError("");
    setDisplayOtherDetailsDiv(true);
    setDisplayUsernamePassword(false);
  }

  return (
    <div>
      <div className="register-page">
        <div className="register-div">
          <h3>Register as User</h3>
          <img src={Registeruserimg} className="register-image"/>
            {displayUsernamePasswordDiv && <div className="username-password-div" id="username-password-div">
            <div className="username-div">
                <img src={userimg}/>
                <input type="text" id="username-input" placeholder="Enter your username" className="register-inputs" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
            </div>
            <span style={{ color: 'red' }}>{nameError}</span>
            <div className="password-div">
                <img src={keyimg}/>
                <input type="password" id="password-input" placeholder="Enter your password" className="register-inputs" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            <span style={{ color: 'red' }}>{passwordError}</span>
            <div className="re-enter-password-div">
                <img src={keyimg}/>
                <input type="password" id="passwords-input" placeholder="Re-enter password" className="register-inputs" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required/>
            </div>
            <button className="next-btn" onClick={DisplayOtherDetails}>Next</button>
            </div>}
            <span style={{ color: 'red' }}>{formError}</span>
            {displayOtherDetailsDiv && <div className="other-details-div" id="other-details-div">
            <div className="name-div">
                <label htmlFor="name">Name</label>
                <input type="text" id="name-input" placeholder="Enter your name" className="register-inputs"
                value={name} onChange={(e)=>setName(e.target.value)} required/>
            </div>
            <div className="email-div">
                <label htmlFor="email">Email</label>
                <input type="text" id="email-input" placeholder="Enter your email" className="register-inputs"
                value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div className="contact-div">
                <label htmlFor="contact">Contact</label>
                <input type='tel' id="contact-input" placeholder="Enter your contact" className="register-inputs"
                value={phone} onChange={(e)=>setPhone(e.target.value)} required/>
            </div>
            <div className="registration-number-div">
                <label htmlFor="registration-number">Gender</label>
                <select value={gender} onChange={(e)=>setGender(e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
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
  )
}
