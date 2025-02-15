import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Driver from './pages/Driver';
import BookingDetail from './pages/BookingDetail';
import AddBooking from './pages/AddBooking';

function App() {
  const [bookings, setBookings] = useState([
    { id: '123123', employee: 'Thompson', status: 'Accepted', from: 'Library', to: 'Data Centre', vehicle: 'NB-002-RF', requestedPickup: '09:00', pickup: '09:05', plannedDrop: '09:30', actualDrop: '09:35' },
    { id: '324235', employee: 'Daniel Radcliff', status: 'Waiting', from: 'Library', to: 'Parking', vehicle: 'NB-002-RF', requestedPickup: '10:00', pickup: '-', plannedDrop: '10:30', actualDrop: '-' },
    { id: '545232', employee: 'W.J. Smith', status: 'No Show', from: 'Data Centre', to: 'Parking', vehicle: 'NB-002-RF', requestedPickup: '11:00', pickup: '-', plannedDrop: '11:30', actualDrop: '-' },
    { id: '434532', employee: 'Tina Shah', status: 'Declined', from: 'Library', to: 'Data Centre', vehicle: '-', requestedPickup: '12:00', pickup: '-', plannedDrop: '12:30', actualDrop: '-' },
    { id: '545233', employee: 'W.J. Smith', status: 'Completed', from: 'Data Centre', to: 'Parking', vehicle: 'NB-002-RF', requestedPickup: '13:00', pickup: '13:05', plannedDrop: '13:30', actualDrop: '13:35' },
    { id: '434533', employee: 'Tina Shah', status: 'Requested', from: 'Library', to: 'Data Centre', vehicle: 'NB-002-RF', requestedPickup: '14:00', pickup: '-', plannedDrop: '14:30', actualDrop: '-' },
    { id: '545234', employee: 'W.J. Smith', status: 'On Going', from: 'Data Centre', to: 'Parking', vehicle: '-', requestedPickup: '15:00', pickup: '15:05', plannedDrop: '15:30', actualDrop: '-' },
    { id: '434534', employee: 'Tina Shah', status: 'Cancelled', from: 'Library', to: 'Data Centre', vehicle: '-', requestedPickup: '16:00', pickup: '-', plannedDrop: '16:30', actualDrop: '-' },
    { id: '545235', employee: 'W.J. Smith', status: 'Dropped', from: 'Data Centre', to: 'Parking', vehicle: 'NB-002-RF', requestedPickup: '17:00', pickup: '17:05', plannedDrop: '17:30', actualDrop: '17:35' },
    { id: '434535', employee: 'Tina Shah', status: 'Declined', from: 'Library', to: 'Data Centre', vehicle: '-', requestedPickup: '18:00', pickup: '-', plannedDrop: '18:30', actualDrop: '-' },
  ]);

  const updateBooking = (updatedBooking) => {
    setBookings(bookings.map(b => b.id === updatedBooking.id ? updatedBooking : b));
  };

  const addBooking = (newBooking) => {
    setBookings([...bookings, newBooking]);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand text-primary" to="/">Shuttle System</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/booking">Bookings</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/driver">Drivers</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/admin">Admin</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking bookings={bookings} updateBooking={updateBooking} />} />
          <Route path="/booking/:id" element={<BookingDetail bookings={bookings} updateBooking={updateBooking} />} />
          <Route path="/add-booking" element={<AddBooking addBooking={addBooking} />} />
          <Route path="/driver" element={<Driver bookings={bookings} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 