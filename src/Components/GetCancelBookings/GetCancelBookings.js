import React, { useEffect, useState } from "react";
import "./GetCancelBookings.css";
import axios from "axios";
import indigo from "../../Assets/Images/indigo.png";
import airIndia from "../../Assets/Images/airindia.png";
import vistara from "../../Assets/Images/vistara.png";

export default function GetCancelBookings() {

  var [bookings, setBooking] = useState([]);
  var userId = sessionStorage.getItem("ownerId");
  const token = sessionStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 4;

  useEffect(() => {
    const httpHeader = {
      headers: { Authorization: "Bearer " + token },
    };
    axios
      .get(
        `http://localhost:5256/api/users/GetAllCancelledBookings`,
        httpHeader
      )
      .then(function (response) {
        const sortBookings = response.data.sort((a, b) => new Date(b.bookingTime) - new Date(a.bookingTime));
        setBooking(sortBookings);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  var [users, setUsers] = useState();

  useEffect(() => {
    const httpHeader = {
      headers: { Authorization: "Bearer " + token },
    };
    axios
      .get(
        `http://localhost:5256/api/admin/dashboard/Users/AllCustomers`,
        httpHeader
      )
      .then(function (response) {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function GetUser(id) {
    const User = users.find((user) => user.userId === id);
    if (User) {
      return User.name;
    }
    return "User Not Found";
  }

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
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    return hours + ":" + minutes + " hours";
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

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bookings-div">
      <div className="get-bookings-div">
        {currentBookings.map((booking, index) => (
          <div key={index} className="booking-list-div">
            <div className="booking-schedule-details">
              <div className="booking-flight-detail">
                <img
                  src={getAirlineImage(booking.booking.schedule.flight.airline)}
                  className="airline-logo"
                />
                <div>
                  <p className="-bookingflight-details">
                    {booking.booking.schedule.flight.airline}
                  </p>
                  <p className="booking-flight-details">
                    {booking.booking.schedule.flightNumber}
                  </p>
                </div>
              </div>
              <div className="flight-source">
                <p className="flight-details">
                  {booking.booking.schedule.route.sourceAirport.city}
                </p>
                <p className="flight-details">
                  {getDate(new Date(booking.booking.schedule.departure)).formattedTime}
                </p>
              </div>
              <p className="time-diff">
                {getTimeDifference(
                  booking.booking.schedule.departure,
                  booking.booking.schedule.arrival
                )}
              </p>
              <div className="flight-destination">
                <p className="flight-details">
                  {booking.booking.schedule.route.destinationAirport.city}
                </p>
                <p className="flight-details">
                  {getDate(new Date(booking.booking.schedule.arrival)).formattedTime}
                </p>
              </div>

              <div className='delete-user-btn' onClick>E</div>
            </div>
            <div className="booking-passenger-details">
              <div>
                Booking Date :{" "}
                <b>{getDate(new Date(booking.booking.bookingTime)).formattedDate}</b>
              </div>
              <div>
                Booked By : <b>{GetUser(booking.booking.userId)}</b>
              </div>
            </div>
          </div>
        ))}
        <div className='pagination'>
          {bookings.length > bookingsPerPage && (
            <button onClick={() => paginate(currentPage - 1)}>Previous</button>
          )}
          {bookings.length > indexOfLastBooking && (
            <button onClick={() => paginate(currentPage + 1)}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
}