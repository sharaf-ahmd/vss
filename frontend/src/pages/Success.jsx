import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Success = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get the session_id from the URL
    const sessionId = new URLSearchParams(location.search).get('session_id');
    
    if (!sessionId) {
      setPaymentStatus('Failed to retrieve session id');
      return;
    }

    // Call your backend to check the payment status using the session_id
    fetch(`http://localhost:5000/api/session-status?session_id=${sessionId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'paid') {
          setPaymentStatus('Payment Successful');
        } else {
          setPaymentStatus('Payment Failed');
        }
      })
      .catch((error) => {
        console.error('Error fetching session status:', error);
        setPaymentStatus('Error fetching payment status');
      });
  }, [location]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>{paymentStatus}</h1>
      <button onClick={() => navigate('/')} style={{ padding: '10px', marginTop: '20px' }}>
        Go to Home
      </button>
    </div>
  );
};

export default Success;
