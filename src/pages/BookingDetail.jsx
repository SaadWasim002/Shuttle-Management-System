import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BookingDetail({ bookings, updateBooking }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const booking = bookings.find(b => b.id === id);
  const [formData, setFormData] = useState(booking);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    updateBooking(formData);
    setIsEditing(false);
  };

  if (!booking) {
    return <div>Booking not found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h5>Booking ID: {booking.id}</h5>
          <button className="close" onClick={() => navigate('/booking')}>&times;</button>
        </div>
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <div className="mr-3">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/052/311/904/small_2x/white-modern-travel-bus-isolated-on-transparent-background-png.png" alt="Vehicle" className="img-fluid" height={100} width={100}/> 
            </div>
            <div>
              <h6>{booking.vehicle}</h6>
              <p className="mb-0">White Bus</p>
            </div>
          </div>
          <div className="mb-3">
            <h6>{booking.employee}</h6>
            {isEditing ? (
              <select
                className="form-control"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Accepted</option>
                <option>Waiting</option>
                <option>No Show</option>
                <option>Requested</option>
                <option>Completed</option>
                <option>On Going</option>
                <option>Cancelled</option>
                <option>Dropped</option>
                <option>Declined</option>
              </select>
            ) : (
              <span className={`badge badge-${getStatusBadge(booking.status)}`}>{booking.status}</span>
            )}
          </div>
          {isEditing ? (
            <>
              <div className="form-group">
                <label>From</label>
                <input
                  type="text"
                  className="form-control"
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>To</label>
                <input
                  type="text"
                  className="form-control"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Requested Pickup Time</label>
                <input
                  type="text"
                  className="form-control"
                  name="requestedPickup"
                  value={formData.requestedPickup}
                  onChange={handleChange}
                />
              </div>
              <button className="btn btn-primary" onClick={handleSave}>Save changes</button>
            </>
          ) : (
            <>
              <div className="mb-3">
                <p><strong>From:</strong> {booking.from}</p>
                <p><strong>To:</strong> {booking.to}</p>
              </div>
              <div className="mb-3">
                <p><strong>Requested Pickup Time:</strong> {booking.requestedPickup}</p>
                <p><strong>Pickup Time:</strong> {booking.pickup}</p>
                <p><strong>Planned Drop:</strong> {booking.plannedDrop}</p>
                <p><strong>Actual Drop:</strong> {booking.actualDrop}</p>
              </div>
              <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>Edit</button>
            </>
          )}
        </div>
      </div>
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

export default BookingDetail;
