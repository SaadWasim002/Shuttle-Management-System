import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mt-5" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div className="jumbotron text-center bg-light p-5 rounded shadow-sm">
        <h1 className="display-4 text-dark" style={{ fontWeight: 700 }}>Shuttle Management System</h1>
        <p className="lead text-muted" style={{ fontWeight: 300 }}>Efficient and seamless campus transportation.</p>
        <hr className="my-4" />
        <p className="text-muted" style={{ fontWeight: 400 }}>Manage bookings, drivers, and more with ease.</p>
        <div className="d-flex justify-content-center">
          <Link to="/booking" className="btn btn-outline-primary btn-lg mx-2">Bookings</Link>
          <Link to="/driver" className="btn btn-outline-secondary btn-lg mx-2">Drivers</Link>
          <Link to="/admin" className="btn btn-outline-success btn-lg mx-2">Admin</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;