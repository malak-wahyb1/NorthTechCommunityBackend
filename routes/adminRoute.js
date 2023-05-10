import { addAdmin,getAdmins,getAdmin,editAdmin,deleteAdmin } from "../controllers/adminController.js";
import express from 'express';
const router=express.Router();

router.post('/',addAdmin);
router.get('/',getAdmins);
router.get('/:id',getAdmin)
router.put('/:id',editAdmin);
router.delete('/:id',deleteAdmin);
export default router