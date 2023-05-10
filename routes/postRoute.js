import { addPost,editPost,deletePost,getPost,getPosts } from '../controllers/postController.js';
import express from 'express';
const router=express.Router();

router.post('/',addPost);
router.get('/',getPosts);
router.get('/:id',getPost)
router.put('/:id',editPost);
router.delete('/:id',deletePost);
export default router