import { addFriend,check,deleteFriend,editFriend,getFriend,getFriends,requestedFriend ,getAllFriend} from '../controllers/friendController.js';
import express from 'express';
const router=express.Router();

router.post('/',addFriend);
router.get('/accepted/:id',getFriends);
router.get('/:id',getFriend)
router.put('/:id',editFriend);
router.delete('/:id',deleteFriend);
router.get('/check/:user/:friend',check)
router.get('/request/:id',requestedFriend)
router.get('/All/:id',getAllFriend)

export default router