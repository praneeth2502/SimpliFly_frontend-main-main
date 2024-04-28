import React, { useState } from "react";
import "./SearchedFlightResult.css";
import { useDispatch, useSelector } from "react-redux";
import { addSearchFlight } from "../../SearchFlightSlice";
import {addSelectedFlight} from '../../SelectedFlightSlice'
import indigo from "../../Assets/Images/indigo.png";
import airIndia from "../../Assets/Images/airindia.png";
import vistara from "../../Assets/Images/vistara.png";
import { useNavigate } from "react-router-dom";
import { addSearchFlightResult} from '../../SearchFlightResultSlice'
import Footer from "../Footer/Footer";
import uparrow from '../../Assets/Images/up-arrow.png'
import downarrow from '../../Assets/Images/down-arrow.png'

export default function SearchedFlightResult() {
  const [isRoundtrip, setIsRoundtrip] = useState(false);
  var getSearchDetails=useSelector((state)=>state.searchFlight)
  var getSearchFlightResult=useSelector((state)=>state.searchFlightResult)
  const currentDateTime = new Date().toISOString().split('T')[0];
  var dispatch=useDispatch()
  var navigate=useNavigate()
  var [airports, setAirports] = useState([]);

  useState(() => {
    fetch("http://localhost:5256/api/Route/GetAirports")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAirports(res);
      });
  });
  
  var[dateOfJourney,setDateOfJourney]= useState(getSearchDetails.dateOfJourney);
  var[Origin,setOrigin]=useState(getSearchDetails.Origin);
  var[Destination,setDestination]=useState(getSearchDetails.Destination);
  var[Adult,setAdult]=useState(getSearchDetails.adult || 1);
  var[Child,setChild]=useState(getSearchDetails.child || 0);
  var[SeatClass,setSeatClass]=useState('economy')

  var searchFlightDetails={}

  var SearchFlight = (e) => {
    e.preventDefault();
    searchFlightDetails.dateOfJourney = dateOfJourney;
    searchFlightDetails.Origin = Origin;
    searchFlightDetails.Destination = Destination;
    searchFlightDetails.Adult=parseInt(Adult);
    searchFlightDetails.Child=parseInt(Child);
    searchFlightDetails.SeatClass=SeatClass;

    dispatch(addSearchFlight({
      dateOfJourney:dateOfJourney,
      Origin:Origin,
      Destination:Destination,
      Adult:Adult,
      Child:Child,
      SeatClass:SeatClass
      }
    ))

    var requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }

    const params = new URLSearchParams({
      dateOfJourney: searchFlightDetails.dateOfJourney,
      Origin: searchFlightDetails.Origin,
      Destination: searchFlightDetails.Destination,
      Adult:searchFlightDetails.Adult,
      Child:searchFlightDetails.Child,
      SeatClass:searchFlightDetails.SeatClass
    });

    fetch(`http://localhost:5256/api/Flight/SearchFlight?${params.toString()}`, requestOptions)
      .then(res => res.json())
      .then(res => {
          console.log(res);
          if(res.length===0){
            alert("No flights available")
            return            
          }
          else{
            dispatch(addSearchFlightResult({ searchFlightResult: res }));
            navigate('/searchFlightResult')
          } 

        })
      .catch(err => console.log(err));
      
      navigate('/searchFlightResult')
}  

  function AddBooking(flight){
    dispatch(addSelectedFlight({
      flightNumber:flight.flightNumber,
      sourceAirport:flight.sourceAirport,
      destinationAirport:flight.destinationAirport,
      departureTime:flight.departureTime,
      arrivalTime:flight.arrivalTime,
      totalPrice:flight.totalPrice,
      scheduleId:flight.scheduleId,
      airline:flight.airline
    }))

    navigate('/user/bookingDetails')
  }
  function getDate(date){
    const formattedDate = date.toLocaleDateString(); 
    const formattedTime = date.toLocaleTimeString();
    return { formattedDate, formattedTime };
  }
  function getTimeDifference(departure,arrival){
    const arrivalTime = new Date(arrival);
    const departureTime = new Date(departure);
    const timeDifference = arrivalTime - departureTime;

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    return hours+":"+minutes+" hours"
  }

  const handleFlightTypeChange = (e) => {
    setIsRoundtrip(e.target.id === "roundtrip");
  };
  const handleSeatClassChange = (e) => {
    setSeatClass(e.target.value);
  };
  const handleAdultChange = (e) => {
    setAdult(e.target.value);
  };
  const handleChildChange = (e) => {
    setChild(e.target.value);
  };

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

  const [showArrow, setShowArrow] = useState(false);
  function DisplaySearch(){
    var showSearchDetails=document.getElementById('search-flight-details-div')
    if(showArrow){
      showSearchDetails.style.display="none"
    }
    else{
      showSearchDetails.style.display="flex"
    }
      setShowArrow(!showArrow)
  }

  return (
    <div className="searched-flight-result-page">
      <div className="search-flight-options" onClick={DisplaySearch}>
        {showArrow ? <img src={uparrow} className="arrow-img" id="down-arrow"/>:
        <img src={downarrow} className="arrow-img" id="up-arrow"/>}
      </div>
      <div className="search-flight-details-div" id="search-flight-details-div">
        <div className="grid">
          <label><b>Source :</b></label>
          <input
            type="text"
            className="input-bar"
            value={Origin}
            onChange={(e) => setOrigin(e.target.value)}
            list="itemList"
          />
        </div>
        <div className="grid">
          <label><b>Destination :</b></label>
          <input
            type="text"
            className="input-bar"
            value={Destination}
            onChange={(e) => setDestination(e.target.value)}
            list="itemList"
          />
          <datalist id="itemList">
                    {airports.map((airport)=>(
                      <option key={airport.id} value={airport.city}>
                      {airport.city}
                    </option>
                    ))}
                  </datalist>
        </div>
        <div className="grid">
          <label><b>Departure :</b></label>
          <input
            type="date"
            className="input-bar"
            value={dateOfJourney}
            onChange={(e) => setDateOfJourney(e.target.value)}
            required min={currentDateTime}
          />
          <datalist id="itemList">
                    {airports.map((airport)=>(
                      <option key={airport.id} value={airport.city}>
                      {airport.city}
                    </option>
                    ))}
                  </datalist>
        </div>
        {isRoundtrip && <div class="grid">Grid 4</div>}
        <div className="passenger-count-div grid">
          <div className="adult-select-div">
          <label htmlFor="adult-select"><b>Adult : </b></label>
          <select id="adult-select" value={Adult} onChange={handleAdultChange}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
          </div>
          <div className="child-select-div">
          <label htmlFor="adult-select"><b>Child : </b></label>
          <select id="child-select" value={Child} onChange={handleChildChange}>
          <option value='0'>0</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
          </div>
        </div>
        <div className="grid">
        <select className="seatClass" value={SeatClass} onChange={handleSeatClassChange}>
                  <option value='economy'>Economy</option>
                  <option value='premiumEconomy'>Premium Economy</option>
                  <option value='businessClass'>Business Class</option>
                </select>
        </div>
        <div className="grid">
        <button type="button" className="search-flight-btn" onClick={SearchFlight}>
        Search
      </button>
        </div>
      </div>
      
      <div className="available-flights-div">
        {getSearchFlightResult.map((flight, index) => (
          <div key={index} className="key-div">
            <div className="available-flight-detail">
            <img
                src={getAirlineImage(flight.airline)}
                className="airline-logo"
              />
              <div>
            <p className="flight-details">{flight.airline}</p>
            <p className="flight-details">{flight.flightNumber}</p>
            </div>
            </div>
            <div className="flight-source">
            <p className="flight-details">{flight.sourceAirport}</p>
            <p className="flight-details">{getDate(new Date(flight.departureTime)).formattedTime}</p>
            </div >
            <p className="time-diff">{getTimeDifference(flight.departureTime,flight.arrivalTime)}</p>
            <div className="flight-destination">
            <p className="flight-details">{flight.destinationAirport}</p>
            <p className="flight-details">{getDate(new Date(flight.arrivalTime)).formattedTime}</p>
            </div>
            <p className="flight-price">&#8377; {flight.totalPrice}</p>
            <button className="book-btn" onClick={() => AddBooking(flight)}>Book</button>

          </div>
        ))}
      </div>
    </div>
  );
}