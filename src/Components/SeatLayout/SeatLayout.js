import React, { useState, useEffect } from "react";
import "./SeatLayout.css";
import { useSelector } from "react-redux";
import BookingDetails from "../BookingDetails/BookingDetails";

export default function SeatLayout() {
  const [seats, setSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  var [cardNumber, setCardNumber] = useState();
  var [cvv, setCvv] = useState();
  var [expiry, setExpiry] = useState();

     // changed here
     const [cardNumberError, setcardNumberError] = useState('');
     const [expiryError, setExpiryError] = useState('');
     const [cvvError, setcvvError] = useState('');
     const [formError, setFormError] = useState('');
     //praneeth kumar
     const validatecardNumber = (cardnumber) => {
      if(!cardnumber)
      {
        setcardNumberError("Please enter cardNumber");
        return false;
      }
      else if (cardnumber.length !== 16) {
        setcardNumberError('Card number should contain exactly 16 characters.');
        return false;
      }
       else 
       {
        setcardNumberError('');
        return true;
      }
    };
    const validexpiry = (Expiry) => {
      if (!Expiry) {
        setExpiryError("Please enter an expiry date");
        return false;
      }
      const today = new Date();
      const [month, year] = Expiry.split('/').map(Number);
      const expiryDate = new Date(year, month - 1, 1); // Creating a date object with the entered month and year
      // Check if the entered value matches the MM/YYYY format
      if (/^(0[1-9]|1[0-2])\/\d{4}$/.test(Expiry) && expiryDate > today) {
        // Check if expiry date is not in the past
        setExpiryError('');
        return true;
      } else if (Expiry === '' || /^\d{0,2}\/$/.test(Expiry)) {
        // Allow empty string or partially entered MM/
        setExpiryError("Invalid Expiry date");
        return false;
      }
    };
    
    const validcvv = (CVV) => {
      if (!CVV) {
        setcvvError("Please enter CVV");
        return false;
      } else if (!/^\d{3}$/.test(CVV)) {
        setcvvError("CVV should contain exactly 3 digits.");
        return false;
      } else {
        setcvvError("");
        return true;
      }
    };
    //till here
  var selectedFlight = useSelector((state) => state.selectedFlight);
  var passengerIds = useSelector((state) => state.passengerIds);

  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState([]);
  var SelectSeat = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      console.log("seat is already booked");
    } else {
      if (selectedSeatNumbers.includes(seatNumber)) {
        const updatedSelectedSeats = selectedSeatNumbers.filter(
          (seat) => seat !== seatNumber
        );
        setSelectedSeatNumbers(updatedSelectedSeats);
        return;
      } else {
        if(selectedSeatNumbers.length+1>passengersIds.length){
          alert(`You can select only ${passengerIds.length} seats.`)
          return
        }
        setSelectedSeatNumbers([...selectedSeatNumbers, seatNumber]);
      }
    }
    console.log(selectedSeatNumbers);
  };

  useEffect(() => {
    console.log("Selected Seats:", selectedSeatNumbers);
  }, [selectedSeatNumbers]);

  useEffect(() => {
    fetch("http://localhost:5256/api/SeatDetail")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        res = res.sort(
          (a, b) =>
            parseInt(a.seatNumber.slice(1)) - parseInt(b.seatNumber.slice(1))
        );
        setSeats(res);
      });
  }, []);

  const params = new URLSearchParams({
    scheduleId: selectedFlight.scheduleId,
  });

  useEffect(() => {
    fetch(
      `http://localhost:5256/api/Bookings/GetBookedSeats?${params.toString()}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setBookedSeats(res);
      });
  }, []);

  var [payments, setPayments] = useState(false);
  function Payments() {
    setPayments(true);
    console.log(passengerIds);
  }

  var [scheduleId, setScheduleId] = useState(selectedFlight.scheduleId);
  var [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  var [bookingTime, seatBookingTime] = useState(Date.now);
  var [passengersIds, setPassengers] = useState(passengerIds);
  var [paymentDetails,setPaymentDetails]=useState({'cardNumber':cardNumber,'expiryDate':expiry,'cvv':cvv})
  var [ticketPrice, setTicketPrice] = useState(selectedFlight.totalPrice);
  var bookingDetails={}

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };
  //change here
  const handleExpiryChange = (e) => {
    setExpiry(e.target.value);
  };
  //till here
  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  function BookTicket() {
    //change here
    // Validate card number before proceeding
    if (validatecardNumber(cardNumber) && validexpiry(expiry) && validcvv(cvv) ){
      setcardNumberError("");
      setcvvError("");
      setExpiryError("");
    }
    //till here
    if(!cardNumber || !cvv || !expiry){
      setFormError("Please fix the errors before logging in.")
      return

    }
    bookingDetails.scheduleId=scheduleId;
    bookingDetails.userId=parseInt(userId);
    bookingDetails.bookingTime=new Date().toISOString();
    bookingDetails.passengerIds=passengersIds;
    bookingDetails.selectedSeats=selectedSeatNumbers;
    bookingDetails.paymentDetails={'cardNumber':cardNumber,'expiryDate':expiry,'cvv':cvv};    
    bookingDetails.price=ticketPrice;
    console.log(bookingDetails);

    var RequestOption = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bookingDetails),
    };
    if(validatecardNumber(cardNumber) && validcvv(cvv) && validexpiry(expiry)){
    fetch(`http://localhost:5256/api/users/${userId}/bookings`, RequestOption)
      .then((res) => res.json())
      .then((res) => {
        console.log("Response:", res);
        alert("Booking added successfully");
      })
      .catch((err) => {
        console.error("Error:", err);
      });
    }
    
  }
  return (
    <div className="seat-layout">
      <div className="seat-color-div">
        <div className="seat-availability">
        <div><p className="booked-seats"></p>Booked Seats</div>
        <div><p className="avilable-seats"></p>Available Seats</div>
        <div><p className="selected-seats"></p>Selected Seats</div>
        </div>
      </div>
      <div className="seat-layout-div">
        <div className="seat-selection">
          <div className="seat-arrangement">
            {seats.map((seat, index) => (
              <div
              key={index}
              className={`flight ${
                bookedSeats.includes(seat.seatNumber) ? "booked" : ""
              }  ${
                selectedSeatNumbers.includes(seat.seatNumber)
                  ? "selected"
                  : ""
              }`}
              onClick={() => SelectSeat(seat.seatNumber)}
            >
                <div id="seats"> {seat.seatNumber}</div>
              </div>
            ))}
          </div>
          <div className="passage"></div>
        </div>
        <button onClick={Payments} className="pay-btn">
          Make Payment
        </button>
      </div>
      {payments && (
        <div className="payments">
          <div className="payment-form mt-4 payment-form-div">
            <h4>Payment Details</h4>
            <div className="mb-3">
              <label htmlFor="cardNumber" className="form-label">
                Card Number
              </label>
              <input
                type="text"
                className="form-control"
                id="cardNumber"
                required
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
            </div>
              {/* Changed here */}
              <span style={{ color: 'red' }}>{cardNumberError}</span>
              {/* till here */}
            <div className="mb-3">
              <label htmlFor="expiryDate" className="form-label">
                Expiry Date
              </label>
              <input
                type="text"
                className="form-control"
                id="expiryDate"
                placeholder="MM/YYYY"
                value={expiry}
                onChange={handleExpiryChange}
                required
              />
            </div>
             {/* Changed here */}
             <span style={{ color: 'red' }}>{expiryError}</span>
              {/* till here */}
            <div className="mb-3">
              <label htmlFor="cvv" className="form-label">
                CVV
              </label>
              <input
                type="password"
                className="form-control"
                id="cvv"
                value={cvv}
                onChange={handleCvvChange}
                required
              />
            </div>
            {/* Changed here */}
            <span style={{ color: 'red' }}>{cvvError}</span>
              {/* till here */}
            <button
              type="button"
              className="btn btn-book-flight btn-block mt-3 book-ticket-btn"
              onClick={BookTicket}
            >
              Book Flight
            </button>
              {/* Changed here */}
              <span style={{ color: 'red' }}>{formError}</span>
            {/* till here */}
          </div>
        </div>
      )}
    </div>
  );
}
