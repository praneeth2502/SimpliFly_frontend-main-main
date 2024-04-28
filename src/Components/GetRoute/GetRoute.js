import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GetRoute.css";

export default function GetRoute() {
  const [routes, setRoutes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const routesPerPage = 4;

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    const httpHeader = {
      headers: { 'Authorization': 'Bearer ' + token }
    }
    axios
      .get("http://localhost:5256/api/Route", httpHeader)
      .then(function (response) {
        setRoutes(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const indexOfLastRoute = currentPage * routesPerPage;
  const indexOfFirstRoute = indexOfLastRoute - routesPerPage;
  const currentRoutes = routes.slice(indexOfFirstRoute, indexOfLastRoute);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="get-route-div">
      {currentRoutes.map((route, index) => (
        <div key={index} className="route-list-div">
          <div>
            <b>RouteId :</b> {route.id}
          </div>
          <div>
            <b>Source Airport :</b> {route.sourceAirport.name}, {route.sourceAirport.city}
          </div>
          <div>
            <b>Destination Airport :</b> {route.destinationAirport.name}, {route.destinationAirport.city}
          </div>
          <div>
            <b>Status :</b> {route.status.name}, {route.status}
          </div>
        </div>
      ))}
      <div className="pagination">
        {routes.length > routesPerPage && (
          <button onClick={() => paginate(currentPage - 1)}>Previous</button>
        )}
        {routes.length > indexOfLastRoute && (
          <button onClick={() => paginate(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}
