import { addFriend,deleteFriend,editFriend,getFriend,getFriends } from '../controllers/friendController.js';
import express from 'express';
const router=express.Router();

router.post('/',addFriend);
router.get('/',getFriends);
router.get('/:id',getFriend)
router.put('/:id',editFriend);
router.delete('/:id',deleteFriend);
export default router