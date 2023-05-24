import { addFriend,deleteFriend,editFriend,getFriend,getFriends,requestedFriend } from '../controllers/friendController.js';
import express from 'express';
const router=express.Router();

router.post('/',addFriend);
router.get('/:id',getFriends);
router.get('/:id',getFriend)
router.put('/:id',editFriend);
router.delete('/:id',deleteFriend);
router.get('/request/:id',requestedFriend)
export default router