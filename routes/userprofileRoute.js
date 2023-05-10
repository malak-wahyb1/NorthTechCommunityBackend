import { addProfile,deleteProfile,editProfile,getProfile,getProfiles } from "../controllers/userprofileController.js";
import express from 'express';
const router=express.Router();

router.post('/',addProfile);
router.get('/',getProfiles);
router.get('/:id',getProfile)
router.put('/:id',editProfile);
router.delete('/:id',deleteProfile);
export default router