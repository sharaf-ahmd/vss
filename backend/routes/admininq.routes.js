import express from 'express';
import { getAdminInquiries, deleteAdminInquiry,updateAdminInquiry } from '../controllers/adminInq.controller.js';
const router = express.Router();

router.get('/', getAdminInquiries);           
router.put('/:id', updateAdminInquiry);      
router.delete('/:id', deleteAdminInquiry); 

export default router;
