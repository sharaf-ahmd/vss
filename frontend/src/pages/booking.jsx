import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { useBookingStore } from '@/store/booking';
import BackButton from '@/components/BackButton';

const stripePromise = loadStripe('pk_test_51RGhSzFNC9lumuod1YciBcs8fWrnrUvUUznVMpl4FITPAzpTFLzcdBMEeXs9QMu0t63bQwEEnHsHFo6IlR1FT8uI00lTPccNmm');

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;

  const { createBooking } = useBookingStore();

  const [bookingDetails, setBookingDetails] = useState({
    customer: '',
    contact: '',
    date: '',
    time: '',
    location: '',
    service: service?.name,
    vendor: service?.vendor,
    price: service?.price,
    email: localStorage.getItem("userEmail")
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(bookingDetails.contact)) {
      setErrors({ contact: 'Contact number must be exactly 10 digits.' });
      return;
    } else {
      setErrors({});
    }

    try {
      const response = await fetch("http://localhost:5000/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingDetails }),
      });

      const data = await response.json();
      if (!data.id) {
        throw new Error("Failed to create checkout session");
      }

      localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });

      if (error) {
        console.error("Stripe checkout error:", error.message);
        alert("Error initiating payment: " + error.message);
      }

    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Something went wrong with your payment. Please try again.");
    }
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
      <BackButton />
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
            type="tel"
            name="contact"
            placeholder="Contact"
            value={bookingDetails.contact}
            onChange={handleChange}
            style={style.inputField}
          />
          {errors.contact && <p style={style.errorText}>{errors.contact}</p>}
        </div>

        <div style={style.inputGroup}>
          <input
            type="date"
            name="date"
            value={bookingDetails.date}
            onChange={handleChange}
            style={style.inputField}
          />
        </div>

        <div style={style.inputGroup}>
          <input
            type="time"
            name="time"
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

        <button style={style.button} onClick={handlePayment}>Pay & Book</button>
      </div>
    </div>
  );
};

export default Booking;
