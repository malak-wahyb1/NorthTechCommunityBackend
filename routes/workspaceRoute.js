import { addWorkspace,deleteWorkspace,editWorkspace,getWorkspace,getWorkspaces } from '../controllers/workspaceController.js';
import express from 'express';
const router=express.Router();

router.post('/',addWorkspace);
router.get('/',getWorkspaces);
router.get('/:id',getWorkspace)
router.put('/:id',editWorkspace);
router.delete('/:id',deleteWorkspace);
export default router