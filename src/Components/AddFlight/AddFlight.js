import React, { useState, useEffect } from 'react';
import './AddFlight.css';

export default function AddFlight() {
  var [flightNumber, setFlightNumber] = useState('');
  var [airline, setAirline] = useState('');
  var [totalSeats, setTotalSeats] = useState('');
  var [basePrice, setBasePrice] = useState('');

  const [company, setCompany] = useState('');

  useEffect(() => {
    fetch(
      `http://localhost:5256/api/FlightOwner?username=${sessionStorage.getItem(
        "username"
      )}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCompany(res.companyName);
      });
  }, []);

  var flightDetails = {};
  var AddFlight = (e) => {
    if (!flightNumber || !totalSeats || !basePrice) {
      alert('Enter all required fields');
      return;
    }
    e.preventDefault();
    flightDetails.flightNumber = flightNumber;
    flightDetails.airline = company;
    flightDetails.totalSeats = parseInt(totalSeats);
    flightDetails.flightOwnerOwnerId = parseInt(sessionStorage.getItem('ownerId'));
    flightDetails.basePrice = parseFloat(basePrice);
    console.log(flightDetails);

    const token = sessionStorage.getItem('token');

    var RequestOption = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(flightDetails),
    };
    fetch('http://localhost:5256/api/Flight/AddFlight', RequestOption)
      .then((res) => res.json())
      .then((res) => {
        console.log('Response:', res);
        alert('Flight added successfully');
      })
      .catch((err) => {
        console.error('Error:', err);
        alert('Flight Already Exists');
      });
  };

  return (
    <div className='add-flight-div'>
      <form className='add-flight-form'>
        <div className='flight-number-div flight-detail-div'>
          <label htmlFor='flight-number'><b>Flight Number : </b></label>
          <input type='text' placeholder='Enter flight number' value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} required />
        </div>
        <div className='flight-airline-div flight-detail-div'>
          <label htmlFor='flight-airline'><b>Airline : </b></label>
          <input type='text' placeholder='Enter airline' value={company} onChange={(e) => setAirline(e.target.value)} required />
        </div>
        <div className='total-seats-div flight-detail-div'>
          <label htmlFor='total-seats'><b>Total Seats : </b></label>
          <input type='number' placeholder='Enter total seats' value={totalSeats} onChange={(e) => setTotalSeats(e.target.value)} required />
        </div>
        <div className='base-price-div flight-detail-div'>
          <label htmlFor='base-price'><b>Base Price : </b></label>
          <input type='number' placeholder='Enter base price' value={basePrice} onChange={(e) => setBasePrice(e.target.value)} required />
        </div>
        <button type='button' className='add-flight-btn' onClick={AddFlight}>Add Flight</button>
      </form>
    </div>
  );
}