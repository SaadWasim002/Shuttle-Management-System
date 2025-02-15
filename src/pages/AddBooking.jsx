import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

function AddBooking({ addBooking }) {
  const [formData, setFormData] = useState({
    employee: '',
    from: '',
    to: '',
    vehicle: '',
    requestedPickup: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateDropTime = (pickupTime) => {
    const [hours, minutes] = pickupTime.split(':').map(Number);
    const dropTime = new Date();
    dropTime.setHours(hours, minutes + 30);
    return format(dropTime, 'HH:mm');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formData.requestedPickup)) {
      alert('Please enter time in HH:mm format');
      return;
    }

    addBooking({ 
      ...formData, 
      id: Date.now().toString(),
      status: 'Accepted',
      pickup: '-',
      plannedDrop: calculateDropTime(formData.requestedPickup),
      actualDrop: '-' 
    });
    
    navigate('/booking');
  };

  return (
    <div className="container mt-5">
      <h2>Add Booking</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee Name</label>
          <input
            type="text"
            className="form-control"
            name="employee"
            value={formData.employee}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>From</label>
          <input
            type="text"
            className="form-control"
            name="from"
            value={formData.from}
            onChange={handleChange}
            required
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
            required
          />
        </div>
        <div className="form-group">
          <label>Vehicle</label>
          <input
            type="text"
            className="form-control"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Requested Pickup Time (HH:mm)</label>
          <input
            type="text"
            className="form-control"
            name="requestedPickup"
            placeholder="e.g., 09:00"
            value={formData.requestedPickup}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Add Booking</button>
      </form>
    </div>
  );
}

export default AddBooking;