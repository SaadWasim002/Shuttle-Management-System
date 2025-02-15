import { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import BookingForm from './BookingForm';

export default function BookingTable({ bookings }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  return (
    <>
      <Button variant="success" className="mb-3" onClick={() => {
        setSelectedBooking(null);
        setShowModal(true);
      }}>
        + New Booking
      </Button>

      <Table striped bordered hover>
        {/* ... existing table code ... */}
        <td>
          <Button 
            variant="info" 
            size="sm"
            onClick={() => {
              setSelectedBooking(booking);
              setShowModal(true);
            }}
          >
            Edit
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            className="ms-2"
            onClick={() => deleteBooking(booking.id)}
          >
            Cancel
          </Button>
        </td>
      </Table>

      <BookingForm 
        show={showModal}
        handleClose={() => setShowModal(false)}
        editData={selectedBooking}
      />
    </>
  );
}