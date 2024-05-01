import React, { useState } from "react";
import "./AddRoute.css";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
export default function AddRoute() {
  var [sourceAirport, setSourceAirport] = useState();
  var [destinationAirport, setDestinationAirport] = useState();
  var [distance, setDistance] = useState();
  var [airports, setAirports] = useState([]);
  var [airportError,setAirportError] = useState([]);
  var [distanceError,setDistanceError] = useState([]);
  var routeDetail = {};

  var AddNewRoute = (e) => {
      if (!sourceAirport || !destinationAirport || !distance) {
        setAirportError("Please fill in all fields");
        return;
      }
      if(distance<100){
        setDistanceError("Distance shoud be atleast 100kms.");
        return;
      }
      setDistanceError("");
      setAirportError("");
    e.preventDefault();
    routeDetail.sourceAirportId = parseInt(sourceAirport);
    routeDetail.destinationAirportId = parseInt(destinationAirport);
    routeDetail.distance = parseFloat(distance);
    console.log(routeDetail);

    const token=sessionStorage.getItem('token')

    var RequestOption={
      method : 'POST',
      headers : {
        'Content-type':'application/json',
        'Authorization':'Bearer '+token
      },
      body : JSON.stringify(routeDetail)
    }
    fetch("http://localhost:5256/api/Route/AddRoute",RequestOption)
    .then(res => res.json())
    .then(res => {
      console.log('Response:', res);
      toast('Route added successfully');
    })
    .catch(err => {
      console.error('Error:', err);
      toast('Route already present');
    });

  };

  useState(() => {
    fetch("http://localhost:5256/api/Route/GetAirports")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAirports(res);
      });
  });
  return (
    <div className="add-route-div">
      <form className="add-route-form">
        <div className="source-airport-div">
          <label htmlFor="source-airport">
            <b>Source Airport : </b>
          </label>
          <select
            className="select-source-airport"
            onChange={(e) => setSourceAirport(e.target.value)}
          >
            <option value="0">--Select airport--</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.city}
              </option>
            ))}
          </select>
        </div>

        <div className="destination-airport-div">
          <label htmlFor="destination-airport">
            <b>Destination Airport : </b>
          </label>
          <select
            className="select-destination-airport"
            onChange={(e) => setDestinationAirport(e.target.value)}
          >
            <option value="0">--Select airport--</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.city}
              </option>
            ))}
          </select>
        </div>
        <div className="distance-div">
          <label htmlFor="distance">
            <b>Enter Distance : </b>
          </label>
          <input
            type="number"
            value={distance}
            min="0"
            onChange={(e) => setDistance(e.target.value)}
          />
        </div>
        <span style={{ color: 'red', fontSize: '14px',paddingRight:'20px' }}>{distanceError}</span>
      </form>
      <button type="button" className="add-route-btn" onClick={AddNewRoute}>
        Add Route
      </button>
      <span style={{ color: 'red', fontSize: '14px',paddingRight:'20px' }}>{airportError}</span>
    <ToastContainer/>
    </div>
  );
}
