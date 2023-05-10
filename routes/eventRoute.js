import { addEvent,editEvent,deleteEvent,getEvent,getEvents } from '../controllers/eventController.js';
import express from 'express';
const router=express.Router();

router.post('/',addEvent);
router.get('/',getEvents);
router.get('/:id',getEvent)
router.put('/:id',editEvent);
router.delete('/:id',deleteEvent);
export default router