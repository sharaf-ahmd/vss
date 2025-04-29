import express from 'express';
import { createInquiry,  deleteInquiry,  getInquiry,} from '../controllers/inquiry.controller.js';
const router = express.Router();

router.get('/', getInquiry);           
router.post('/', createInquiry);      
router.delete('/:id', deleteInquiry); 

export default router;
