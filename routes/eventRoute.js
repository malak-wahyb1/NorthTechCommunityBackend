import { addEvent,editEvent,deleteEvent,getEvent,getEvents } from '../controllers/eventController.js';
import express from 'express';
import imageHandler from'../middleware/image.js';
const router=express.Router();

router.post('/',imageHandler,addEvent);
router.get('/',getEvents);
router.get('/:id',getEvent)
router.put('/:id',imageHandler,editEvent);
router.delete('/:id',deleteEvent);
export default router