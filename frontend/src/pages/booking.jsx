
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useBookingStore } from '@/store/booking';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;

  const [bookingDetails, setBookingDetails] = useState({
    customer: '',
    contact: '',
    date: '',
    time: '', 
    location:'',
    service: service?.name,     
    vendor: service?.vendor,    
    price: service?.price,
    email: localStorage.getItem("userEmail") 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleBooking = () => {
    navigate('/payment', { state: { bookingDetails } });
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
    formContainer: {
      padding: '20px',
      backgroundColor:'#27272a',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    inputGroup: {
      marginBottom: '12px',
    },
    inputField: {
      width: '100%',
      padding: '10px',
      margin: '5px 0',
      borderRadius: '4px',
      backgroundColor:'#27272a',
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


  return (
    <div style={style.container}>
      <h1 style={style.heading}>Make Booking</h1>
      <div style={style.formContainer}>
        <div style={style.inputGroup}>
          <input
            type="text"
            value={service?.name || ''} 
            readOnly
            style={style.inputField}
          />
        </div>

        <div style={style.inputGroup}>
          <input
            type="text"
            value={service?.vendor || ''} 
            readOnly
            style={style.inputField}
          />
        </div>

        <div style={style.inputGroup}>
          <input
            type="text"
            value={`$${service?.price}`}
            readOnly
            style={style.inputField}
          />
        </div>

        <div style={style.inputGroup}>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={bookingDetails.email}
            onChange={handleChange}
            style={style.inputField}
            readOnly
          />
        </div>

        <div style={style.inputGroup}>
          <input
            type="text"
            name="customer"
            placeholder="Your Name"
            value={bookingDetails.customer}
            onChange={handleChange}
            style={style.inputField}
          />
        </div>

        <div style={style.inputGroup}>
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={bookingDetails.contact}
            onChange={handleChange}
            style={style.inputField}
          />
        </div>

        <div style={style.inputGroup}>
          <input
            type="date"
            name="date"
            placeholder="Booking time"
            value={bookingDetails.date}
            onChange={handleChange}
            style={style.inputField}
          />
        </div>

        <div style={style.inputGroup}>
          <input
            type="time"
            name="time"
            placeholder="Booking time"
            value={bookingDetails.time}
            onChange={handleChange}
            style={style.inputField}
          />
        </div>

        <div style={style.inputGroup}>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={bookingDetails.location}
            onChange={handleChange}
            style={style.inputField}
          />
        </div>

        <button style={style.button} onClick={handleBooking}>Book</button>
      </div>
    </div>
  );
};

export default Booking;