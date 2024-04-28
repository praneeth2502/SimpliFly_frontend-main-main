import React, { useEffect, useState } from "react";
import "./Profile.css";

export default function Profile() {
  var [user, setUser] = useState({});
  var userRole = sessionStorage.getItem("role");
  var username=sessionStorage.getItem("username")
  const token=sessionStorage.getItem('token')

  var [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [phone, setPhone] = useState("");
  var [company, setCompany] = useState("");
  var [address,setAddress]=useState("");
  var [businessRegistrationNumber,setBusinessRegistrationNumber]=useState("");
  var [position, setPosition] = useState("");

  var [isCustomer, setIsCustomer] = useState(false);
  var [isFlightOwner,setIsFlightOwner]=useState(false)
  var [isAdmin,setIsAdmin]=useState(false)

  useEffect(() => {
    
    if (userRole == "flightOwner") {
        setIsFlightOwner(true)
      fetch(
        `http://localhost:5256/api/FlightOwner?username=${sessionStorage.getItem(
          "username"
        )}`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setUser(res);
          setName(res.name);
          setEmail(res.email);
          setPhone(res.contactNumber);
          setCompany(res.companyName);
          setAddress(res.address);
          setBusinessRegistrationNumber(res.businessRegistrationNumber);
        });
    } else if (userRole == "customer") {
        setIsCustomer(true)
      fetch(
        `http://localhost:5256/api/users/GetCustomerByUsername?username=${sessionStorage.getItem(
          "username"
        )}`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setUser(res);
          setName(res.name);
          setEmail(res.email);
          setPhone(res.phone);
        });
    } else {
        setIsAdmin(true)
      fetch(
        `http://localhost:5256/api/admin/dashboard/GetAdminByUsername?username=${sessionStorage.getItem(
          "username"
        )}`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setUser(res);
          setName(res.name);
          setEmail(res.email);
          setPhone(res.contactNumber);
          setPosition(res.position);
        });
    }
  }, []);

  var UpdateProfile=(e)=>{
    e.preventDefault();
    
    if (userRole == "flightOwner") {
        var flightOwner={}
        flightOwner.ownerId=sessionStorage.getItem("ownerId");
        flightOwner.name=name;
        flightOwner.email=email;
        flightOwner.companyName=company;
        flightOwner.contactNumber=phone;
        flightOwner.username=username;
        flightOwner.address=address;
        flightOwner.businessRegistrationNumber=businessRegistrationNumber;
console.log(flightOwner);
        var RequestOption={
            method : 'PUT',
            headers : {'Content-Type':'application/json',
            'Authorization':'Bearer '+token},
            body : JSON.stringify(flightOwner)
        }

        fetch("http://localhost:5256/api/FlightOwner",RequestOption)
            .then(res=>res.json())
            .then(res=>{
                console.log(res);
                alert('Profile updated successfully');
            })
            .catch(err => {
                console.error('Error:', err);
                alert('Error updating profile.');
              });
    }
    
    else if (userRole == "customer") {
var customer={}
customer.userId=sessionStorage.getItem("userId");
customer.name=name;
customer.email=email;
customer.phone=phone;
customer.username=username;
console.log(customer);

var RequestOption={
    method : 'PUT',
    headers : {'Content-Type':'application/json',
    'Authorization':'Bearer '+token},
    body : JSON.stringify(customer)
}

fetch("http://localhost:5256/api/users/UpdateUser",RequestOption)
    .then(res=>res.json())
    .then(res=>{
        console.log(res);
        alert('Profile updated successfully');
    })
    .catch(err => {
        console.error('Error:', err);
        alert('Error updating profile.');
      });

    }
    else{
var admin={}
admin.adminId=sessionStorage.getItem("adminId");
admin.name=name;
admin.email=email;
admin.position=position;
admin.contactNumber=phone;
admin.address=address
console.log(admin);

var RequestOption={
    method : 'PUT',
    headers : {'Content-Type':'application/json',
    'Authorization':'Bearer '+token},
    body : JSON.stringify(admin)
}

fetch("http://localhost:5256/api/admin/dashboard",RequestOption)
    .then(res=>res.json())
    .then(res=>{
        console.log(res);
        alert('Profile updated successfully');
    })
    .catch(err => {
        console.error('Error:', err);
        alert('Error updating profile.');
      });
    }
  }

  return (
    <div>
      <div className="container profile-section">
        <div className="row">
          <div className="col-md-6">
            <div className="profile-content">
              <form className="update-form">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label custom-label">
                    Name :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label custom-label">
                    Email :
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label custom-label">
                    Phone :
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phone"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                {isFlightOwner && <div className="mb-3">
                  <label htmlFor="company" className="form-label custom-label">
                    Company :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="company"
                    placeholder="Enter your company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>}
                {isFlightOwner && <div className="mb-3">
                  <label htmlFor="address" className="form-label custom-label">
                    Address :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter your Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>}
                {isAdmin && <div className="mb-3">
                  <label htmlFor="designation" className="form-label custom-label">
                    Designation :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="designation"
                    placeholder="Enter your designation"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </div>}
                <button
                  type="button"
                  className="btn btn-new update-profile-btn"
                onClick={UpdateProfile}>
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
