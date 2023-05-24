import express from 'express';
const router=express.Router();
import { allMessages,sendMessage } from '../controllers/messageController.js';
router.post('/',sendMessage)
router.get('/:chatId', allMessages);


export default router