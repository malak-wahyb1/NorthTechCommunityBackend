import { addUser,deleteUser,getUsers,getUser,editUser,loginUser } from '../controllers/userController.js';
import express from 'express';
import imageHandler from'../middleware/image.js';

const router=express.Router();

router.post('/',imageHandler, addUser);
router.get('/',getUsers);
router.get('/:id',getUser)
router.put('/:id',imageHandler,editUser);
router.delete('/:id',deleteUser);
router.post('/login',loginUser);
// router.get('/search',searchUser);
export default router