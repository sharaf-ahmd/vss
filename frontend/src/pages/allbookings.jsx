import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useBookingStore } from '@/store/booking';
import 'react-toastify/dist/ReactToastify.css';

const AllBookings = () => {
     const{ fetchBooking, bookings, UpdateBooking }=useBookingStore();

  useEffect(() => {
    fetchBooking(true); 
  }, [fetchBooking]);
  
  const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  const handleStatusUpdate = async (id, status) => {
    const { success } = await UpdateBooking(id, { status });
    if (success) {
      toast.success(`Booking ${status.toLowerCase()}ed successfully!`);
      fetchBooking(); 
    } else {
      toast.error(`Failed to ${status.toLowerCase()} booking`);
    }
  };

  return (
    <div style={styles.container}>
    
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Service</th>
            <th style={styles.th}>Shop</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Time</th>
            <th style={styles.th}>Location</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} style={styles.tr}>
              <td style={styles.td}>{booking.email}</td>
              <td style={styles.td}>{booking.service}</td>
              <td style={styles.td}>{booking.vendor}</td>
              <td style={styles.td}>{formatDate(booking.date)}</td>
              <td style={styles.td}>{booking.time}</td>
              <td style={styles.td}>{booking.location}</td>
              <td style={styles.td}>{booking.status || 'Pending'}</td>
              <td style={styles.td}>
                <button
                  style={{ ...styles.button, backgroundColor: '#4caf50' }}
                  onClick={() => handleStatusUpdate(booking._id, 'Confirmed')}
                >
                  Confirm
                </button>
                <button
                  style={{ ...styles.button, backgroundColor: '#f44336' }}
                  onClick={() => handleStatusUpdate(booking._id, 'Declined')}
                >
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '10px',
  },
  table: {
    marginTop: '30px',
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: '10px',
    overflow: 'hidden',
    border: '2px solid #196662',
  },
  thead: {
    backgroundColor: '#023D54',
    color: 'white',
  },
  th: {
    padding: '10px',
    fontSize: '18px',
    textAlign: 'center',
  },
  tr: {
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: '10px',
    fontSize: '16px',
    textAlign: 'center',
  },
  button: {
    color: 'white',
    padding: '6px 10px',
    margin: '5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AllBookings;
