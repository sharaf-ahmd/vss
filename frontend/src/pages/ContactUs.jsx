import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import BackButton from '@/components/BackButton';
import car from '../assets/car4.jpg'

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
    backgroundImage: `url(${car})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: 'white', 
    minHeight: '100vh',
  },
  heading: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
    color: '#e0e0e0',
    maxWidth: '800px',
    margin: '0 auto 30px',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: '10px',
    borderRadius: '10px',
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  contactCard: {
    padding: '50px',
    borderRadius: '30px',
    border: '2px solid #3D5668',
    textAlign: 'center',
    height: '180px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  icon: {
    fontSize: '32px',
    color: '#ffffff',
  },
  formContainer: {
    marginTop: '80px',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #3D5668',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    marginTop: '10px',
    borderRadius: '5px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    height: '100px',
    borderRadius: '5px',
  },
  button: {
    marginTop: '20px',
    backgroundColor: '#3D5668',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  desc: {
    color: '#d3d3d3',
  },
};

const ContactUs = () => {
  const contactInfo = [
    { icon: Mail, title: 'Email', content: 'contact@carcnct.com' },
    { icon: Phone, title: 'Phone', content: '+94 7768 746 632' },
    { icon: MapPin, title: 'Address', content: '123 Business Street, Suite 100, City, State 12345' },
  ];

  return (
    <div style={styles.container}>
      <BackButton />
      <h1 style={styles.heading}>Contact Us</h1>
      <p style={styles.text}>
        Get in Touch with Us <br />
        We’re here to help! Whether you have a question, need assistance, or just want to share your feedback, we’d love to hear from you. Our team is dedicated to providing you with prompt and friendly support. <br /><br />
        Call Us for immediate assistance. <br />
        Email Us with your inquiries, and we’ll get back to you as soon as possible. <br />
        Live Chat for quick responses from our support team. <br /><br />
        Your satisfaction is our priority—reach out today and let’s connect!
      </p>

      <div style={styles.contactGrid}>
        {contactInfo.map((item, index) => (
          <div key={index} style={styles.contactCard}>
            <center><item.icon style={styles.icon} /></center>
            <h3>{item.title}</h3>
            <p style={styles.desc}>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactUs;
