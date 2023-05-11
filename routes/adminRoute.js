import { addAdmin,getAdmins,getAdmin,editAdmin,deleteAdmin,loginAdmin } from "../controllers/adminController.js";
import express from 'express';
const router=express.Router();

router.post('/',addAdmin);
router.get('/',getAdmins);
router.get('/:id',getAdmin)
router.put('/:id',editAdmin);
router.delete('/:id',deleteAdmin);
router.post("/login",loginAdmin);
export default router