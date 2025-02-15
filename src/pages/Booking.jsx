import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Booking({ bookings }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/booking/${id}`);
  };

  const handleAddBooking = () => {
    navigate('/add-booking');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortedBookings = [...bookings].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredBookings = sortedBookings.filter((booking) =>
    Object.values(booking).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? 'fas fa-sort-up' : 'fas fa-sort-down';
    }
    return 'fas fa-sort';
  };

  return (
    <div className="container mt-5">
      <h2>Booking Management</h2>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary" onClick={handleAddBooking}>Add Booking</button>
        <div className="input-group" style={{ width: '250px' }}>
          <div className="input-group-prepend">
            <span className="input-group-text" style={{ height: '38px' }}><i className="fas fa-search"></i></span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Search Emp, ID, Booking ID"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ height: '38px' }}
          />
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            {['id', 'employee', 'status', 'from', 'to', 'vehicle', 'requestedPickup', 'pickup', 'plannedDrop', 'actualDrop'].map((key) => (
              <th key={key} onClick={() => requestSort(key)} style={{ cursor: 'pointer' }}>
                <div className="d-flex align-items-center">
                  <span>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</span>
                  <i className={`ml-1 ${getSortIcon(key)}`}></i>
                </div>
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.employee}</td>
              <td><span className={`badge badge-${getStatusBadge(booking.status)}`}>{booking.status}</span></td>
              <td>{booking.from}</td>
              <td>{booking.to}</td>
              <td>{booking.vehicle}</td>
              <td>{booking.requestedPickup}</td>
              <td>{booking.pickup}</td>
              <td>{booking.plannedDrop}</td>
              <td>{booking.actualDrop}</td>
              <td>
                <button className="btn btn-outline-primary btn-sm" onClick={() => handleView(booking.id)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getStatusBadge(status) {
  switch (status) {
    case 'Accepted':
      return 'success';
    case 'Waiting':
      return 'warning';
    case 'No Show':
      return 'danger';
    case 'Requested':
      return 'info';
    case 'Completed':
      return 'success';
    case 'On Going':
      return 'primary';
    case 'Cancelled':
      return 'danger';
    case 'Dropped':
      return 'secondary';
    case 'Declined':
      return 'dark';
    default:
      return 'secondary';
  }
}

export default Booking;