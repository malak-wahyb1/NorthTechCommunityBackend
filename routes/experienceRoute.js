import { addExperience,editExperience,deleteExperience,getExperience,getExperiences } from '../controllers/experienceController.js';
import express from 'express';
const router=express.Router();

router.post('/',addExperience);
router.get('/',getExperiences);
router.get('/:id',getExperience)
router.put('/:id',editExperience);
router.delete('/:id',deleteExperience);
export default router