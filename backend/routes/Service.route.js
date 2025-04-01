import express from 'express';
import { createService, deleteService, getServices, updateService } from '../controllers/Services.controller.js';

const router = express.Router();


router.get('/',getServices);  
router.post('/', createService);
router.delete('/:id', deleteService); 
router.put("/:id", updateService);



export default router;