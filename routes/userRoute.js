import { addUser,deleteUser,getUsers,getUser,editUser,loginUser, follow,unfollow } from '../controllers/userController.js';
import express from 'express';
import imageHandler from'../middleware/image.js';

const router=express.Router();

router.post('/',imageHandler, addUser);
router.get('/',getUsers);
router.get('/:id',getUser)
router.put('/:id',imageHandler,editUser);
router.delete('/:id',deleteUser);
router.post('/login',loginUser);
router.put('/follow/:followId/:senderId',follow)
router.put('./unfollow',unfollow)
// router.get('/search',searchUser);
export default router