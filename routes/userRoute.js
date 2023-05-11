import { addUser,deleteUser,getUsers,getUser,editUser,loginUser } from '../controllers/userController.js';
import express from 'express';
const router=express.Router();

router.post('/',addUser);
router.get('/',getUsers);
router.get('/:id',getUser)
router.put('/:id',editUser);
router.delete('/:id',deleteUser);
router.post('/login',loginUser);
export default router