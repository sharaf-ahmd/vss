import React from 'react';
import { useNavigate } from 'react-router-dom';

import lft from '../assets/lft.png'

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(-1)} 
      style={styles.button}
      title="Go Back"
    >
      <img 
        src={lft}
        alt="Back" 
        style={styles.icon}
      />
    </button>
  );
};

const styles = {
  button: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    border: '1px solid #ccc',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.2s ease',
  },
  icon: {
    width: '20px',
    height: '20px',
    objectFit: 'contain',
  }
};

export default BackButton;
