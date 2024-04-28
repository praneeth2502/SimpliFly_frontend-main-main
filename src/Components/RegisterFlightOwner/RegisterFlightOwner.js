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
  //change here
  const [usernameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
 const [contactNumberError, setContactNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [companyError, setCompanyError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [businessRegistrationError, setBusinessRegistrationError] = useState('');
  const [formError, setFormError] = useState('');
  const [ registerformError, setRegisterFormError] = useState('');
  const validateUsername = (Name) => {
    if (!Name) {
      setUserNameError("Please enter a name");
      return false;
    } else if (/^[^a-zA-Z]/.test(Name)) {
      setUserNameError("Name should start with a letter");
      return false;
    } else {
      setUserNameError("");
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
  const validatecontNumber = (ContactNumber) => {
    const phoneRegex = /^\d{10}$/; // This assumes a 10-digit phone number
    if (!ContactNumber) {
      setContactNumberError("Please enter a contact number.");
      return false;
    }
    else if (!phoneRegex.test(ContactNumber)) {
       // Regular expression to match a typical phone number formas
      setContactNumberError("Please enter a valid 10-digit contact number.");
      return false;
    }
    else{
      setContactNumberError("");
      return true;
    }
  };
  const validatemail = (Mail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!Mail) {
      setEmailError("Please enter an email address.");
      return false;
    }
    else if (!emailRegex.test(Mail)) {
      // Regular expression to match a typical email address format
      setEmailError("Please enter a valid email address.");
      return false;
    }
    return true;
  };
  const validatename = (Name) => {
    if (!Name) {
      setNameError("Please enter a name");
      return false;
    } else if (/[^a-zA-Z]/.test(Name)) {
      setNameError("Please enter a valid passenger name");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };
  const validateBusinessRegistration = (BusinessRegistration) => {
    // Regular expression to match only digits and characters
    const regExp = /^[a-zA-Z0-9]+$/;
    if (!BusinessRegistration) {
      setBusinessRegistrationError("Please fill this field.");
      return false;
    } else if (!regExp.test(BusinessRegistration)) {
      setBusinessRegistrationError("Business registration should only comprise digits and characters.");
      return false;
    }else {
    // Clear the error if validation passes
    setBusinessRegistrationError("");
    return true;
    }
  };
  //till here
  var flightOwner={}
  var Register =(e)=>{
    if(!name || !email || !contactNumber || !address || !businessRegistration){
      setRegisterFormError("Fill the above fields");
      return;
    }
    if (validatename(name) && validatemail(email) && validatecontNumber(contactNumber) && validateBusinessRegistration(businessRegistration)){
      setNameError("");
      setEmailError("");
      setContactNumberError("");
      setBusinessRegistrationError("");
      setRegisterFormError("");
    }
    else {
      setRegisterFormError("fill the required fields for registration")
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
    if (validatename(name) && validatecontNumber(contactNumber) && validatemail(email)){
    fetch("http://localhost:5256/api/User/RegisterFlightOwner",RequestOption)
      .then(res=>res.json())
      .then(res=>{
        console.log(res)
        setRegisterMessage(true)
      })
      .catch(err=>{console.log(err)
        setRegisterFormError("Enter all required details");})
  }
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
            <span style={{ color: 'red' }}>{usernameError}</span>
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
                <label htmlFor="name"style={{ fontSize: '16px', fontWeight: 'bold'  }}>Name:</label>
                <input type="text" id="name-input" placeholder="Enter your name" className="register-inputs"
                value={name} onChange={(e)=>setName(e.target.value)} required/>
            </div>
            <span style={{ color: 'red' }}>{nameError}</span>
            <div className="email-div">
                <label htmlFor="email"style={{ fontSize: '16px', fontWeight: 'bold'  }}>Email:</label>
                <input type="text" id="email-input" placeholder="Enter your email" className="register-inputs"
                value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <span style={{ color: 'red' }}>{emailError}</span>
            <div className="contact-div"style={{ fontSize: '16px', fontWeight: 'bold'  }}>
                <label htmlFor="contact">Contact:</label>
                <input type='tel' id="contact-input" placeholder="Enter your contact" className="register-inputs"
                value={contactNumber} onChange={(e)=>setContactNumber(e.target.value)} required/>
            </div>
            <span style={{ color: 'red' }}>{contactNumberError}</span>
            <div className="company-div"style={{ fontSize: '16px', fontWeight: 'bold'  }}>
                <label htmlFor="company">Company:</label>
                <input type="text" id="company-input" placeholder="Enter your company" className="register-inputs"
                value={companyName} onChange={(e)=>setCompanyName(e.target.value)}/>
            </div>
            <span style={{ color: 'red' }}>{companyError}</span>
            <div className="address-div"style={{ fontSize: '16px', fontWeight: 'bold'  }}>
                <label htmlFor="address">Address:</label>
                <input type='text' id="address-input" placeholder="Enter your address" className="register-inputs"
                value={address} onChange={(e)=>setAddress(e.target.value)}/>
            </div>
            <span style={{ color: 'red' }}>{addressError}</span>
            <div className="registration-number-div">
                <label htmlFor="registration-number"style={{ fontSize: '16px', fontWeight: 'bold'  }}>BusinessNumber:</label>
                <input type='text' id="registration-number-input" placeholder="Enter your business-registration-number" className="register-inputs" value={businessRegistration} onChange={(e)=>setBusinessRegistration(e.target.value)}  required/>
            </div>
            <span style={{ color: 'red' }}>{businessRegistrationError}</span>
            <div className="btns">
            <button className="back-btn" onClick={DisplayUsernamePassword}>Back</button>
            <button value="Register" id="register-btn" onClick={Register}>Register</button>
            </div>
            </div>}
            <span style={{ color: 'red' }}>{registerformError}</span>
        </div>
      {registerMessage && <RegisteredSuccessfully className="register-successfully-div"/>}
      </div>
    </div>
  );
}
