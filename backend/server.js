import express from 'express';
import dotenv from 'dotenv';
import { db } from './config/db.js';
import ServiceRoute from './routes/Service.route.js';
import BookingRoute from './routes/Booking.route.js';


dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();



app.use(express.json());//allows to accept json data
app.use("/api/services", ServiceRoute);
app.use("/api/booking", BookingRoute);


app.listen(PORT, () => {
  db();
  console.log(`Server running on port ${PORT}`);
});
