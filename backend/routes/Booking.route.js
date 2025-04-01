import express from 'express';
import { createbooking,deleteBooking, getBooking, updateBooking } from '../controllers/Booking.controller.js';

const router = express.Router();


router.get('/',getBooking);  
router.post('/', createbooking);
router.delete('/:id', deleteBooking); 
router.put("/:id", updateBooking);



export default router;