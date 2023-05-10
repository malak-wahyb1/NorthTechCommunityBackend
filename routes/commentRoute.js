import { addComment,editComment,deleteComment,getComment,getComments } from '../controllers/commentController.js';
import express from 'express';
const router=express.Router();

router.post('/',addComment);
router.get('/',getComments);
router.get('/:id',getComment)
router.put('/:id',editComment);
router.delete('/:id',deleteComment);
export default router