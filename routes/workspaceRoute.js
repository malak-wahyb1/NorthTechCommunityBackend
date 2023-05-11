import { addWorkspace,deleteWorkspace,editWorkspace,getWorkspace,getWorkspaces } from '../controllers/workspaceController.js';
import express from 'express';
import imageHandler from'../middleware/image.js';
const router=express.Router();

router.post('/',imageHandler,addWorkspace);
router.get('/',getWorkspaces);
router.get('/:id',getWorkspace)
router.put('/:id',imageHandler,editWorkspace);
router.delete('/:id',deleteWorkspace);
export default router