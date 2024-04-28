import React, { useState, useEffect } from "react";
import axios from "axios";
import indigo from "../../Assets/Images/indigo.png";
import airIndia from "../../Assets/Images/airindia.png";
import vistara from "../../Assets/Images/vistara.png";
import "./GetFlight.css";

export default function GetFlight() {
  const [flights, setFlights] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 5;
    //Change here
    const flightOwnerId = sessionStorage.getItem("ownerId");
    //till here
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const httpHeader = {
      headers: { 'Authorization': 'Bearer ' + token }
    };
    axios
      // change here (only api, check port no accordingly)
      .get(`http://localhost:5256/api/Flight/GetAllFlights/flightOwnerId?flightOwnerId=${flightOwnerId}`, httpHeader)
      .then(function (response) {
        setFlights(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const getAirlineImage = (airline) => {
    airline = airline.toLowerCase();
    switch (airline) {
      case "indigo":
        return indigo;
      case "air india":
        return airIndia;
      case "vistara":
        return vistara;
      default:
        return indigo;
    }
  };

  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="get-flight-div">
      {currentFlights.map((flight, index) => (
        <div key={index} className="flight-list-div">
          <div className="flight-list">
            <div className="airline">
              <img
                src={getAirlineImage(flight.airline)}
                className="airline-logo"
              />
              <h3>{flight.airline}</h3>
            </div>
            <div className="flight-number">
              Flight Number : <b>{flight.flightNumber}</b>
            </div>
          </div>
          <div className="other-detail-div">
            <div className="total-seats">
              Total Seats : <b>{flight.totalSeats}</b>
            </div>
            <div className="base-price">
              Base Price : <b>Rs. {flight.basePrice}</b>
            </div>
            <div className="status">
              status : <b>{flight.status}</b>
            </div>
          </div>
        </div>
      ))}
      <div className="pagination">
        {flights.length > flightsPerPage && (
          <button onClick={() => paginate(currentPage - 1)}>Previous</button>
        )}
        {flights.length > indexOfLastFlight && (
          <button onClick={() => paginate(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}
