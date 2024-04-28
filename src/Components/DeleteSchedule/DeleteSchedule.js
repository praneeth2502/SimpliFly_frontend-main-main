import React, { useState } from "react";
import "./DeleteSchedule.css";
import axios from "axios";
import { json } from "react-router-dom";

export default function DeleteSchedule() {
  const currentDateTime = new Date().toISOString();
  var [airlineScheduleDelete, setAirlineScheduleDelete] = useState(true);
  var [dateScheduleDelete, setDateScheduleDelete] = useState(false);

  var [flightNumber, setFlightNumber] = useState();
  var [airport, setAirport] = useState();
  var [date, setDate] = useState();

  var [airports, setAirports] = useState([]);

  var [flights, setFlights] = useState([]);

  useState(() => {
    const token = sessionStorage.getItem("token");
    const httpHeader = {
      headers: { Authorization: "Bearer " + token },
    };
    axios
      .get("http://localhost:5256/api/Flight", httpHeader)
      .then(function (response) {
        setFlights(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  var DeleteFligtSchedule = (e) => {
    const confirmDelete = window.confirm(`Are you sure you want to remove the schedule?`);
        if(confirmDelete){
          e.preventDefault();
          console.log(flightNumber);
      
          const params = new URLSearchParams({
            flightNumber: flightNumber,
          });
      
          const token = sessionStorage.getItem("token");
          var RequestOption = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              'Authorization':'Bearer '+token
            },
          };
          fetch(
            `http://localhost:5256/api/Schedule/DeleteScheduleByFlight?${params.toString()}`,
            RequestOption
          )
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              alert("Schedule deleted successfully");
            })
            .catch((err) => {
              console.error("Error:", err);
              alert("Error deleting Schedule.");
            });
        }
    
  };
  var deleteDateScheduleData={}

  var DeleteDateSchedule = (e) => {
    const confirmDelete = window.confirm(`Are you sure you want to remove the schedule?`);
        if(confirmDelete){
          deleteDateScheduleData.dateOfSchedule=date
          deleteDateScheduleData.airportId=airport
      
          const token = sessionStorage.getItem("token");
          var RequestOption = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              'Authorization':'Bearer '+token,
            },
            body : JSON.stringify(deleteDateScheduleData)
          };
          fetch(
            `http://localhost:5256/api/Schedule/DeleteScheduleByDate`,
            RequestOption
          )
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              alert("Schedule deleted successfully");
            })
            .catch((err) => {
              console.error("Error:", err);
              alert("Error deleting Schedule.");
            });
        }   
    
  };

  useState(() => {
    fetch("http://localhost:5256/api/Route/GetAirports")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAirports(res);
      });
  });

  const handleFlightNumberChange = (e) => {
    setFlightNumber(e.target.value);
  };

  return (
    <div className="delete-schedule-options-div">
      <div className="delete-options-div">
        <div
          className="delete-flightschedule-btn"
          onClick={() => {
            setAirlineScheduleDelete(true);
            setDateScheduleDelete(false);
          }}
        >
          Delete Flight Schedule
        </div>
        <div
          className="delete-dateschedule-btn"
          onClick={() => {
            setAirlineScheduleDelete(false);
            setDateScheduleDelete(true);
          }}
        >
          Delete Schedule by Date
        </div>
      </div>
      <div className="delete-schedule-div">
        {airlineScheduleDelete && (
          <div className="delete-flight-schedule">
            <form>
              <div className="flightnumber-input-div">
                <label htmlFor="flight-number">
                  <b>Flight Number :</b>{" "}
                </label>
                <select
                  className="select-destination-airport"
                  onChange={handleFlightNumberChange}
                >
                  <option value="0">--Select flight--</option>
                  {flights.map((flight) => (
                    <option
                      key={flight.flightNumber}
                      value={flight.flightNumber}
                    >
                      {flight.flightNumber}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="delete-schedule-btn"
                onClick={DeleteFligtSchedule}
              >
                Delete Schedule
              </button>
            </form>
          </div>
        )}
        {dateScheduleDelete && (
          <div className="delete-date-schedule">
            <form>
              <div className="date-div">
                <label htmlFor="departure-time">
                  <b>Departure Date : </b>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={currentDateTime}
                />
              </div>

              <div className="destination-airport-div airport-select-div">
                <label htmlFor="destination-airport">
                  <b>Airport : </b>
                </label>
                <select
                  className="select-destination-airport"
                  onChange={(e) => setAirport(e.target.value)}
                >
                  <option value="0">--Select airport--</option>
                  {airports.map((airport) => (
                    <option key={airport.id} value={airport.id}>
                      {airport.city}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="delete-date-schedule-btn"
                onClick={DeleteDateSchedule}
              >
                Delete Schedule
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
