import React from 'react';
import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/bk.avif';
import image2 from '../assets/mb.jpg';
import image4 from '../assets/his.jpg';
import logout from '../assets/lg.png';

const UserDash = () => {

  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const storedUserEmail = localStorage.getItem('userEmail');
    if (!storedUserEmail) {
      navigate('/login'); 
    } else {
      setUserEmail(storedUserEmail);
    }
  }, [navigate]);

  const Operations = [
    {
        title: 'Book Services',
        description: 'Easily schedule appointments for car maintenance and repairs with trusted service providers.',
        buttonText: 'Add Now',
        image: image1,
        to: '/viewservice',
      },
      {
        title: 'Manage Bookings',
        description: 'Keep track of all your scheduled services, make updates, or remove bookings as needed.',
        buttonText: 'View Now',
        image: image2,
        to: '/managebooking',
      },
      {
        title: 'View Bookings',
        description: 'Check the details of your upcoming and past bookings at a glance for better service management.',
        buttonText: 'View Now',
        image: image4,
        to: '',
      },
   
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>User Dashboard</h1>
      <div style={styles.flexContainer}>
        {Operations.map((operation, index) => (
          <div key={index} style={styles.card}>
            <img src={operation.image} alt={operation.title} style={styles.image} />
            <div style={styles.cardBody}>
              <h2 style={styles.cardTitle}>{operation.title}</h2>
              <p style={styles.cardDescription}>{operation.description}</p>
              <a href={operation.to} style={styles.button}>{operation.buttonText}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '20px',
  },
  flexContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '500px',
    borderRadius: '15px',
    border: '2px solid #f26361',
    overflow: 'hidden',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  image: {
    width: '150px',
    height: '200px',
    objectFit: 'cover',
  },
  cardBody: {
    padding: '15px',
    textAlign: 'left',
  },
  cardTitle: {
    marginBottom: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px',
  },
  button: {
    display: 'inline-block',
    padding: '10px 15px',
    color: 'white',
    backgroundColor: '#f26361',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
};

export default UserDash;


