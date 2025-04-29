import React from 'react';
import image1 from '../assets/1.png';
import image2 from '../assets/1.avif';
import image4 from '../assets/his.jpg';
import logout from '../assets/lg.png';

const MechanicDash = () => {
  const Operations = [
    {
      title: 'Add New Service',
      description: 'Expand your offerings and introduce new services to your clients.',
      buttonText: 'Add Now',
      image: image1,
      to: '/CreatePage',
    },
    {
      title: 'My Services',
      description: 'Manage your services by updating existing offerings to improve quality or deleting outdated ones.',
      buttonText: 'View Now',
      image: image2,
      to: '/Operations',
    },
    {
      title: 'Manage inquires',
      description: 'Manage your inquiries effortlessy, to improve customer satisfaction.',
      buttonText: 'Add Now',
      image: image4,
      to: '/admininquiries',
    },
 
   
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Mechanic Dashboard</h1>
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

export default MechanicDash;
