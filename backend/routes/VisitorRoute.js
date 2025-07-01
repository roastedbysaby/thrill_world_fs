import express from 'express';
import { createVisitor, getAllVisitors, getSingleVisitor, updateVisitor, deleteVisitor} from '../controllers/VisitorController.js';
import { findVisitorId } from '../middlewares/findVisitorId.js';
import { validateVisitorData } from '../middlewares/validateVisitorData.js';

const router = express.Router();

router.post('/visitors', validateVisitorData, createVisitor);

router.get('/visitors', getAllVisitors);

router.get('/visitors/:id', findVisitorId, getSingleVisitor);

router.put('/visitors/:id', findVisitorId, validateVisitorData, updateVisitor);

router.delete('/visitors/:id', findVisitorId, deleteVisitor);

export default router;