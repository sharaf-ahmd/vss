import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useBookingStore } from '@/store/booking';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';  
import BackButton from '@/components/BackButton';

const AllBookings = () => {
  const { fetchBooking, bookings, UpdateBooking } = useBookingStore();
  const navigate = useNavigate();  

  useEffect(() => {
    fetchBooking(true);
  }, [fetchBooking]);

  const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  const handleStatusUpdate = async (id, status) => {
    const { success } = await UpdateBooking(id, { status });
    if (success) {
      toast.success(`Booking ${status.toLowerCase()}ed successfully!`);
      fetchBooking();
    } else {
      toast.error(`Failed to ${status.toLowerCase()} booking`);
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Bookings Report", 14, 15);

    const tableColumn = ["Email", "Service", "Shop", "Date", "Time", "Location", "Status"];
    const tableRows = bookings.map(b => [
      b.email,
      b.service,
      b.vendor,
      formatDate(b.date),
      b.time,
      b.location,
      b.status || 'Pending',
    ]);

    autoTable(doc, {
      startY: 20,
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('bookings.pdf');
  };

  const exportCSV = () => {
    const csvRows = [
      ["Email", "Service", "Shop", "Date", "Time", "Location", "Status"],
      ...bookings.map(b => [
        b.email,
        b.service,
        b.vendor,
        formatDate(b.date),
        b.time,
        b.location,
        b.status || 'Pending'
      ])
    ];

    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "bookings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.container}>
    
      <BackButton />

      
      <div style={styles.buttonContainer}>
        <button style={{ ...styles.button, backgroundColor: '#2196F3' }} onClick={exportPDF}>Export PDF</button>
        <button style={{ ...styles.button, backgroundColor: '#FF9800' }} onClick={exportCSV}>Export CSV</button>
      </div>

      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Service</th>
            <th style={styles.th}>Shop</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Time</th>
            <th style={styles.th}>Location</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} style={styles.tr}>
              <td style={styles.td}>{booking.email}</td>
              <td style={styles.td}>{booking.service}</td>
              <td style={styles.td}>{booking.vendor}</td>
              <td style={styles.td}>{formatDate(booking.date)}</td>
              <td style={styles.td}>{booking.time}</td>
              <td style={styles.td}>{booking.location}</td>
              <td style={styles.td}>{booking.status || 'Pending'}</td>
              <td style={styles.td}>
                <button
                  style={{ ...styles.button, backgroundColor: '#4caf50' }}
                  onClick={() => handleStatusUpdate(booking._id, 'Confirmed')}
                >
                  Confirm
                </button>
                <button
                  style={{ ...styles.button, backgroundColor: '#f44336' }}
                  onClick={() => handleStatusUpdate(booking._id, 'Declined')}
                >
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

const styles = {
  container: {
    padding: '10px',
  },
 

  table: {
    marginTop: '30px',
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: '10px',
    overflow: 'hidden',
    border: '2px solid #196662',
  },
  thead: {
    backgroundColor: '#023D54',
    color: 'white',
  },
  th: {
    padding: '10px',
    fontSize: '18px',
    textAlign: 'center',
  },
  tr: {
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: '10px',
    fontSize: '16px',
    textAlign: 'center',
  },
  button: {
    color: 'white',
    padding: '6px 10px',
    margin: '5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonContainer: {
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '10px',
  gap: '10px',
}
};

export default AllBookings;
