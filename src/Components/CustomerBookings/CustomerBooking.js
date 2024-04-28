import React, { useState } from 'react';
import './CustomerBooking.css';
import indigo from "../../Assets/Images/indigo.png";
import airIndia from "../../Assets/Images/airindia.png";
import vistara from "../../Assets/Images/vistara.png";
import jsPDF from 'jspdf';
import boardingPassImage from "./Images/image.png";
import JsBarcode from 'jsbarcode';


export default function CustomerBooking() {
  var [bookings, setBookings] = useState([]);
  var userId = sessionStorage.getItem("userId");

  useState(() => {
    fetch(`http://localhost:5256/api/users/GetBookingByCustomerId?customerId=${userId}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const pastBookings = res.filter(a => new Date(a.booking.schedule.departure) > new Date());
        const sortedBookings = pastBookings.sort((a, b) => new Date(b.booking.bookingTime) - new Date(a.booking.bookingTime));
        setBookings(sortedBookings);
      });
  });

  function getDate(date) {
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return { formattedDate, formattedTime };
  }
  function getTimeDifference(departure, arrival) {
    const arrivalTime = new Date(arrival);
    const departureTime = new Date(departure);
    const timeDifference = arrivalTime - departureTime;

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    return hours + ":" + minutes + " hours";
  }

  function CancelBooking(passengerId) {
    const confirmDelete = window.confirm(`Are you sure you want to cancel booking?`);
    if (confirmDelete) {

      const token = sessionStorage.getItem('token')
      var RequestOption = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }

      fetch(`http://localhost:5256/api/users/CancelBookingByPassenger?passengerId=${passengerId}`, RequestOption)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          alert('Booking cancelled successfully');
        })
        .catch(err => {
          console.error('Error:', err);
          alert('Error canceling booking.');
        });

    }
    console.log(passengerId);
  }

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

  const downloadTicket = (booking) => {
    const doc = new jsPDF();
    
    // Set background color
    doc.setFillColor(244,229,215,255); // White background

    doc.addImage(boardingPassImage, 'JPEG', 0, 0, 210, 297);
    
    // Ticket header
   
    doc.setFontSize(20);
    doc.setTextColor(0); // Black text color
    doc.text("Boarding Pass", 100, 25, null, null, 'center');
    
    // Airline and flight details
    doc.setFontSize(12);
    doc.text(`Airline: ${booking.booking.schedule.flight.airline}`, 20, 55); // Position airline name before image
    const airlineImage = getAirlineImage(booking.booking.schedule.flight.airline);
    doc.addImage(airlineImage, 'PNG', 55, 46, 15, 15); // Add airline image
    doc.text(`Flight ID: ${booking.booking.schedule.flightId}`, 20, 65);
    doc.text(`From: ${booking.booking.schedule.route.sourceAirport.city}`, 20, 75);
    doc.text(`To: ${booking.booking.schedule.route.destinationAirport.city}`, 20, 85);
    doc.text(`Departure: ${getDate(new Date(booking.booking.schedule.departure)).formattedDate} ${getDate(new Date(booking.booking.schedule.departure)).formattedTime}`, 20, 95);
    doc.text(`Arrival: ${getDate(new Date(booking.booking.schedule.arrival)).formattedDate} ${getDate(new Date(booking.booking.schedule.arrival)).formattedTime}`, 20, 105);
    doc.text(`Gate: ${Math.floor(Math.random() * 10)}`, 20, 115); // Random gate number
    doc.text(`Seat: ${booking.seatDetail.seatNumber} (${booking.seatDetail.seatClass})`, 20, 125);
    
    // Passenger details
    doc.text(`Passenger: ${booking.passenger.name}`, 100, 55);
    doc.text(`Age: ${booking.passenger.age}`, 100, 65);
    
    const barcodeValue = `${booking.booking.schedule.flightId}${booking.booking.bookingTime}`;
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, barcodeValue, {
      format: 'CODE128',
      displayValue: false,
      margin: 0,
      width: 1,
      height: 40
    });
  
    // Add barcode image to PDF
    const barcodeDataURL = canvas.toDataURL('image/jpeg');
    doc.addImage(barcodeDataURL, 'JPEG', 120, 85, 70, 30);
    
    // Boarding pass details
    doc.setFontSize(8);
    doc.text("This is your boarding pass. Please keep it safe and handy during your journey.", 100, 145, null, null, 'center');
    
    // Footer
    doc.setLineWidth(0.5);
    doc.line(10, 150, 200, 150);
    doc.setFontSize(10);
    doc.text("Thank you for flying with us!", 100, 155, null, null, 'center');
    
    doc.save('boarding-pass.pdf');
  };
  

  return (
    <div className='bookings-div'>
      <div className='get-bookings-div'>
        {bookings.map((booking, index) => (
          <div key={index} className="booking-list-div">
            <div className='booking-schedule-details'>
              <div className="booking-flight-detail">
                <img
                  src={getAirlineImage(booking.booking.schedule.flight.airline)}
                  className="airline-logo"
                />
                <p className="-bookingflight-details">{booking.booking.schedule.flight.airline}</p>
                <p className="booking-flight-details">{booking.booking.schedule.flightId}</p>
              </div>
              <div className="flight-source">
                <p className="flight-details">{booking.booking.schedule.route.sourceAirport.city}</p>
                <p className="flight-details">{getDate(new Date(booking.booking.schedule.departure)).formattedTime}</p>
              </div>
              <p className="time-diff">{getTimeDifference(booking.booking.schedule.departure, booking.booking.schedule.arrival)}</p>
              <div className="flight-destination">
                <p className="flight-details">{booking.booking.schedule.route.destinationAirport.city}</p>
                <p className="flight-details">{getDate(new Date(booking.booking.schedule.arrival)).formattedTime}</p>
              </div>
              <button className="download-ticket-button" onClick={() => downloadTicket(booking)}>Download Ticket</button>
              <div className='delete-user-btn' onClick={() => CancelBooking(booking.passengerId)}>X</div>
            </div>
            <div className='date-seat-div'>
              <div>Departure Date : <b>{getDate(new Date(booking.booking.schedule.departure)).formattedDate}</b></div>
              <div>Seat : <b>{booking.seatDetail.seatNumber} ({booking.seatDetail.seatClass})</b></div>
            </div>
            <div className='booking-passenger-details'>
              <div>Passenger name : <b>{booking.passenger.name}</b></div>
              <div>Age : <b>{booking.passenger.age}</b></div>
              <div>Booking Date : <b>{getDate(new Date(booking.booking.bookingTime)).formattedDate}</b></div>
            </div>
          </div>))}
      </div>
    </div>
  )
}
