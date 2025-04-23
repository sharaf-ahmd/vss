import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { useBookingStore } from '@/store/booking';



const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails;
  const { createBooking } = useBookingStore();

  const handleBooking = async () => {
    const { success, message } = await createBooking(bookingDetails);
    console.log(success, message);
    console.log('data sent', bookingDetails);
    navigate('/managebooking');
  };

  

  const style = {
    container: {
      maxWidth: '480px',
      margin: '0 auto',
      padding: '20px',
    },
    heading: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: '20px',
    },
    card: {
      backgroundColor: '#27272a',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
    },
    label: {
      color: 'white',
      marginBottom: '10px',
      display: 'block',
    },
    value: {
      color: '#a1a1aa',
      marginBottom: '15px',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: 'white',
      color: 'black',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
    },
  };

  if (!bookingDetails) {
    return (
      <div style={style.container}>
        <h1 style={style.heading}>No booking details found</h1>
      </div>
    );
  }

  return (
    <div style={style.container}>
      <h1 style={style.heading}>Payment Details</h1>
      <div style={style.card}>
        <div>
          <label style={style.label}>Service:</label>
          <p style={style.value}>{bookingDetails.service}</p>
        </div>
        <div>
          <label style={style.label}>Customer:</label>
          <p style={style.value}>{bookingDetails.customer}</p>
        </div>
        <div>
          <label style={style.label}>Date:</label>
          <p style={style.value}>{bookingDetails.date}</p>
        </div>
        <div>
          <label style={style.label}>Time:</label>
          <p style={style.value}>{bookingDetails.time}</p>
        </div>
        <div>
          <label style={style.label}>Amount:</label>
          <p style={style.value}>${bookingDetails.price}</p>
        </div>
      </div>
      <button style={style.button} onClick={handleBooking}>
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
