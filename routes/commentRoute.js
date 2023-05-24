import { addComment,editComment,deleteComment,getComment,getComments,getCommentUserPost } from '../controllers/commentController.js';
import express from 'express';
const router=express.Router();

router.post('/',addComment);
router.get('/',getComments);
router.get('/:id',getComment)
router.put('/:id',editComment);
router.delete('/:id',deleteComment);
router.get('/user/:id/:id2',getCommentUserPost)
export default router