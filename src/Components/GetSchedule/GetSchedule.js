import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GetSchedule.css';
import indigo from "../../Assets/Images/indigo.png";
import airIndia from "../../Assets/Images/airindia.png";
import vistara from "../../Assets/Images/vistara.png";

export default function GetSchedule() {
    const [schedules, setSchedules] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const schedulesPerPage = 4;

    function getDate(date) {
        const formattedDate = date.toLocaleDateString(); 
        const formattedTime = date.toLocaleTimeString();

        return { formattedDate, formattedTime };
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const httpHeader = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.get("http://localhost:5256/api/Schedule", httpHeader)
            .then(function(response) {
                setSchedules(response.data);
            })
            .catch(function(err) {
                console.log(err);
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

    const indexOfLastSchedule = currentPage * schedulesPerPage;
    const indexOfFirstSchedule = indexOfLastSchedule - schedulesPerPage;
    const currentSchedules = schedules.slice(indexOfFirstSchedule, indexOfLastSchedule);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='schedule-div'>        
                {currentSchedules.map((schedule, index) =>
                    <div key={index} className='schedule-list-div'>
                        <div className='schedule-flight-detail'>
                            <div><b>Flight Number :</b> {schedule.flightId}</div>
                            <div><b>Airline :</b> {schedule.flight.airline}
                            <img
                                src={getAirlineImage(schedule.flight.airline)}
                                className="airline-logo"
                            />
                            </div>
                        </div>
                        <div className='schedule-route-detail'>
                            <div className='schedule-source-detail'>
                                <div><b>Source Airport :</b> {schedule.route.sourceAirport.city}</div>
                                <div><b>Departure :</b> {getDate(new Date(schedule.departure)).formattedDate} {getDate(new Date(schedule.departure)).formattedTime}</div>
                            </div>
                            <div className='schedule-destination-detail'>
                                <div><b>Destination Airport :</b>{schedule.route.destinationAirport.city}</div>
                                <div><b>Arrival :</b> {getDate(new Date(schedule.arrival)).formattedDate} {getDate(new Date(schedule.arrival)).formattedTime}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="pagination">
                {schedules.length > schedulesPerPage && (
                    <button onClick={() => paginate(currentPage - 1)}>Previous</button>
                )}
                {schedules.length > indexOfLastSchedule && (
                    <button onClick={() => paginate(currentPage + 1)}>Next</button>
                )}
            </div>
        </div>
    );
}
