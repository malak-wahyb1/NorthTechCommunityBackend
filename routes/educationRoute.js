import { addEducation,deleteEducation,editEducation,getEducation,getEducations } from '../controllers/educationController.js';
import express from 'express';
const router=express.Router();

router.post('/',addEducation);
router.get('/',getEducations);
router.get('/:id',getEducation)
router.put('/:id',editEducation);
router.delete('/:id',deleteEducation);
export default router