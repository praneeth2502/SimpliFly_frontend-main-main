import React, { useState, useEffect } from 'react'
import './GetUser.css'
import axios from 'axios';

export default function GetUser() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const httpHeader = {
      headers: { 'Authorization': 'Bearer ' + token }
    };

    axios.get("http://localhost:5256/api/admin/dashboard/Users/AllCustomers", httpHeader)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const token = sessionStorage.getItem('token');
  function DeleteUser(username) {
    const confirmDelete = window.confirm(`Are you sure you want to delete user ${username}?`);
    if (confirmDelete) {
      var RequestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + token },
      };

      fetch(`http://localhost:5256/api/admin/dashboard/DeleteUserByUsername?username=${username}`, RequestOptions)
        .then((res) => res.json())
        .then((res) => { console.log(res) })
        .catch((err) => {
          alert("Something went wrong");
        });
    }
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='get-user-div'>
      {currentUsers.map((user, index) => (
        <div key={index} className="user-list-div">
          <div className='user-name-div user-row'><p>Name : </p>{user.name}</div>
          <div className='user-gender-div user-row'><p>Gender : </p>{user.gender}</div>
          <div className='user-email-div user-row'><p>Email : </p>{user.email}</div>
          <div className='user-phone-div user-row'><p>Phone : </p>{user.phone}</div>
          <div className='delete-user-btn' onClick={() => DeleteUser(user.username)}>X</div>
        </div>
      ))}
      <div className='pagination'>
        {users.length > usersPerPage && (
          <>
            <button onClick={() => paginate(currentPage - 1)}>Previous</button>
            <button onClick={() => paginate(currentPage + 1)}>Next</button>
          </>
        )}
      </div>
    </div>
  )
}
