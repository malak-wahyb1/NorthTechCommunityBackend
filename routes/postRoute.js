import { addPost,editPost,deletePost,getPost,getPosts } from '../controllers/postController.js';
import express from 'express';
import imageHandler from'../middleware/image.js';
const router=express.Router();

router.post('/',imageHandler,addPost);
router.get('/',getPosts);
router.get('/:id',getPost)
router.put('/:id',imageHandler,editPost);
router.delete('/:id',deletePost);

export default router