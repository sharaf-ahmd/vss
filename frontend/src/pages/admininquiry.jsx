import React, { useEffect, useState } from 'react';
import { useAdminInquiryStore } from '../store/admininq';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from '@/components/BackButton'


const AdminInquiriesPage = () => {
  const { inquiries, fetchAdminInquiries, updateAdminInquiry, deleteAdminInquiry } = useAdminInquiryStore();
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState('completed');

  useEffect(() => {
    fetchAdminInquiries(); 
  }, [fetchAdminInquiries]);

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleStatusChange = () => {
    setStatus(status === 'completed' ? 'pending' : 'completed');
  };

  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    if (selectedInquiry && response) {
      const updatedInquiry = {
        ...selectedInquiry,
        response,
        status,
      };
      const result = await updateAdminInquiry(selectedInquiry._id, updatedInquiry);
      if (result.success) {
        toast.success('Response sent successfully');
        setResponse('');
        setSelectedInquiry(null);
      } else {
        toast.error(result.message);
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await deleteAdminInquiry(id);
    if (result.success) {
      toast.success('Inquiry deleted successfully');
    } else {
      toast.error(result.message);
    }
  };

  // Export to PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Inquiries Report", 14, 15);

    const tableColumn = ["User", "Status", "Message", "Response"];
    const tableRows = inquiries.map(inq => [
      inq.user,
      inq.status,
      inq.message,
      inq.response || 'No Response',
    ]);

    autoTable(doc, {
      startY: 20,
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('inquiries.pdf');
  };

  // Export to CSV
  const exportCSV = () => {
    const csvRows = [
      ["User", "Status", "Message", "Response"],
      ...inquiries.map(inq => [
        inq.user,
        inq.status,
        inq.message,
        inq.response || 'No Response'
      ])
    ];

    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "inquiries.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const style = {
    container: {
      maxWidth: '800px',
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
    inquiryCard: {
      backgroundColor: '#27272a',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '15px',
      border: '1px solid #444',
    },
    inputField: {
      width: '100%',
      padding: '10px',
      margin: '5px 0',
      borderRadius: '4px',
      backgroundColor: '#444',
      color: 'white',
      border: '1px solid #555',
    },
    button: {
      padding: '8px 16px', 
      backgroundColor: '#4CAF50', 
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      marginTop: '10px', 
      transition: 'background-color 0.3s ease',
    },
    deleteButton: {
      padding: '8px 16px', 
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      marginTop: '10px',
      transition: 'background-color 0.3s ease',
    },
    cardHeader: {
      fontWeight: 'bold',
    },
    messageRow: {
      marginBottom: '20px',
    },
     buttonContainer: {
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '10px',
  gap: '10px',
}
  };

  return (
    <div style={style.container}>
       <BackButton />
      <h1 style={style.heading}>Manage Inquiries</h1>
      <div style={style.buttonContainer}>
        <button style={{ ...style.button, backgroundColor: '#2196F3' }} onClick={exportPDF}>Export PDF</button>
        <button style={{ ...style.button, backgroundColor: '#FF9800' }} onClick={exportCSV}>Export CSV</button>
      </div>
      <div>
        {inquiries.length === 0 ? (
          <p>No inquiries to display.</p>
        ) : (
          inquiries.map((inq) => (
            <div key={inq._id} style={style.inquiryCard}>
              <div>
                <div style={style.cardHeader}>User: {inq.user}</div>
                <div><strong>Status:</strong> {inq.status}</div>
                <div><strong>Message:</strong> {inq.message}</div>
                {inq.response && <div><strong>Response:</strong> {inq.response}</div>}
              </div>
              <button
                style={style.button}
                onClick={() => {
                  setSelectedInquiry(inq);
                  setResponse(inq.response || '');
                  setStatus(inq.status || 'pending');
                }}
              >
                Respond
              </button>
              <button
                style={{ ...style.deleteButton, marginLeft: '10px' }}
                onClick={() => handleDelete(inq._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {selectedInquiry && (
        <div style={style.inquiryCard}>
          <h2>Respond to Inquiry</h2>
          <form onSubmit={handleSubmitResponse}>
            <div style={style.messageRow}>
              <textarea
                style={style.inputField}
                rows={4}
                value={response}
                onChange={handleResponseChange}
                placeholder="Type your response here..."
                required
              />
            </div>
            <div>
              <label>
                <strong>Status:</strong>
                <select
                  value={status}
                  onChange={handleStatusChange}
                  style={style.inputField}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </label>
            </div>
            <button type="submit" style={style.button}>
              Submit Response
            </button>
          </form>
        </div>
      )}

      
    </div>
  );
};

export default AdminInquiriesPage;
