import React, { useEffect, useState } from 'react';
import { useInquiryStore } from '../store/inquiry';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InquiriesPage = () => {
  const { inquiries, statusMessage, loading, fetchInquiries, createInquiry, deleteInquiry } = useInquiryStore();
  const [formData, setFormData] = useState({
    user: '',
    email: localStorage.getItem("userEmail") || '',
    message: '',
  });

  useEffect(() => {
    if (formData.email) fetchInquiries(formData.email);
  }, [formData.email, fetchInquiries]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createInquiry(formData);
    
   
    if (result.success) {
      toast.success('Inquiry submitted successfully!');
    } else {
      toast.error('Failed to submit inquiry: ' + result.message);
    }
    
    setFormData({ user: '', message: '' }); 
  };

  const handleDelete = async (id) => {
    const result = await deleteInquiry(id);
    
    if (result.success) {
      toast.success('Inquiry deleted successfully!');
    } else {
      toast.error('Failed to delete inquiry: ' + result.message);
    }
  };

  const style = {
    container: {
      maxWidth: '960px',
      margin: '0 auto',
      padding: '20px',
      color: 'white',
    },
    heading: {
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '20px',
    },
    formContainer: {
      padding: '20px',
      backgroundColor: '#27272a',
      borderRadius: '8px',
      marginBottom: '40px',
    },
    inputGroup: {
      marginBottom: '12px',
    },
    inputField: {
      width: '100%',
      padding: '10px',
      margin: '5px 0',
      borderRadius: '4px',
      backgroundColor: '#27272a',
      color: 'white',
      border: '1px solid #444',
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
    status: {
      marginBottom: '15px',
      color: '#4CAF50',
      textAlign: 'center',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
      borderRadius: '8px',  // Added border radius for the table
      overflow: 'hidden',   // Ensure the rounded corners are visible
    },
    tableHeader: {
      backgroundColor: '#1f1f21',
      color: '#ccc',
      padding: '10px',
      textAlign: 'left',
      borderBottom: '1px solid #333',
    },
    tableRow: {
      backgroundColor: '#27272a',
      color: '#ccc',
      padding: '10px',
      borderBottom: '1px solid #333',
    },
    tableCell: {
      padding: '12px',  // Added padding to the table cells
      wordBreak: 'break-word',  // Ensures long words break properly in the cell
    },
    deleteButton: {
      backgroundColor: '#d9534f',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '8px 12px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      margin: '7px',
    },
  };

  return (
    <div style={style.container}>
      <h1 style={style.heading}>Submit Inquiry</h1>
      {statusMessage && <p style={style.status}>{statusMessage}</p>}
      <form style={style.formContainer} onSubmit={handleSubmit}>
        <div style={style.inputGroup}>
          <input
            type="text"
            name="user"
            placeholder="Your Name"
            value={formData.user}
            onChange={handleChange}
            style={style.inputField}
            required
          />
        </div>
        <div style={style.inputGroup}>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            style={style.inputField}
          />
        </div>
        <div style={style.inputGroup}>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            style={style.inputField}
            required
          />
        </div>
        <button type="submit" style={style.button} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      <h2 style={style.heading}>Your Inquiries</h2>
      {inquiries.length > 0 ? (
        <table style={style.table}>
          <thead>
            <tr>
              <th style={style.tableHeader}>User</th>
              <th style={style.tableHeader}>Status</th>
              <th style={style.tableHeader}>Message</th>
              <th style={style.tableHeader}>Response</th>
              <th style={style.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr key={inq._id} style={style.tableRow}>
                <td style={style.tableCell}>{inq.user}</td>
                <td style={style.tableCell}>{inq.status}</td>
                <td style={style.tableCell}>{inq.message}</td>
                <td style={style.tableCell}>{inq.response ? inq.response : 'No response yet'}</td>
                <td>
                  <button 
                    style={style.deleteButton} 
                    onClick={() => handleDelete(inq._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={style.status}>No inquiries yet.</p>
      )}
    </div>
  );
};

export default InquiriesPage;
