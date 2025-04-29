import express from "express";
import dotenv from "dotenv";
import { db } from "./config/db.js";
import ServiceRoute from "./routes/Service.route.js";
import BookingRoute from "./routes/Booking.route.js";
import { router as userRoutes } from "./routes/Users.js"; 
import { router as authRoutes } from "./routes/auth.js";
import checkoutRoutes from "./routes/checkout.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";
import adminInquiryRoutes from "./routes/admininq.routes.js";
import cors from "cors"; 

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json()); 
app.use("/api/services", ServiceRoute);
app.use("/api/booking", BookingRoute);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/admininq", adminInquiryRoutes)
app.use("/api", checkoutRoutes); 

app.listen(PORT, () => {
  db();
  console.log(`Server running on port ${PORT}`);
});
