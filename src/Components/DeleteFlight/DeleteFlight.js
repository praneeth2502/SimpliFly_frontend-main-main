import React, { useState } from 'react'
import './DeleteFlight.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function DeleteFlight() {

    var [flightNumber,setFlightNumber]=useState();
    var [flights, setFlights] = useState([
      {
        airline: "",
        flightNumber: "",
        totalSeats: "",
        basePrice: "",
      },
    ]);

      //Change here
  const flightOwnerId = sessionStorage.getItem("ownerId");
  //till here

    const handleFlightNumberChange = (e) => {
      setFlightNumber(e.target.value);
    };

    useState(() => {
      const token=sessionStorage.getItem('token')
      const httpHeader={
        headers:{'Authorization':'Bearer '+token}
    }
      axios
        .get(`http://localhost:5256/api/Flight/GetAllFlights/flightOwnerId?flightOwnerId=${flightOwnerId}`,httpHeader)
        .then(function (response) {
          setFlights(response.data);
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })},[]);
        

    var DeleteFlightFun=(e)=>{
      if(!flightNumber){
        toast("Please select flight number")
        return
      }
        const confirmDelete = window.confirm(`Are you sure you want to remove the flight?`);
        if(confirmDelete){
          e.preventDefault()
          console.log(flightNumber)
  
          const params = new URLSearchParams({
              flightNumber: flightNumber,
            });
          
          const token=sessionStorage.getItem('token')
          var RequestOption={
              method : 'DELETE',
              headers : {
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token
              }
          }
          fetch(`http://localhost:5256/api/Flight?${params.toString()}`,RequestOption)
              .then(res=>res.json())
              .then(res=>{
                  console.log(res);
                  toast('Flight deleted successfully');
              })
              .catch(err => {
                  console.error('Error:', err);
                  toast('Error deleting flight.');
                });
        }
        
    }
  return (
    <div className='delete-flight-div'>
      <div className='delete-flight-detail-div'>
        <label htmlFor='flight-number'><b>Flight Number : </b></label>
        <select
            className="select-destination-airport"
            onChange={handleFlightNumberChange}
          >
            <option value="0">--Select flight--</option>
            {flights.map((flight) => (
              <option key={flight.flightNumber} value={flight.flightNumber}>
                {flight.flightNumber}
              </option>
            ))}
          </select>
      </div>
      <button type='button' className='delete-flight-btn' onClick={DeleteFlightFun}>Delete Flight</button>
      <ToastContainer/>
    </div>
  )
}
