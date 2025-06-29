import express from 'express';
import { createMaintenance, getAllMaintenances, getSingleMaintenance, updateMaintenance, deleteMaintenance } from '../controllers/MaintenanceController.js';
import { findMaintenanceId } from '../middlewares/findMaintenanceId.js';
import { validateMaintenanceData } from '../middlewares/validateMaintenanceData.js';

const router = express.Router();

router.post('/maintenances', validateMaintenanceData, createMaintenance);

router.get('/maintenances', getAllMaintenances);

router.get('/maintenances/:id', findMaintenanceId, getSingleMaintenance);

router.put('/maintenances/:id', findMaintenanceId, validateMaintenanceData, updateMaintenance);

router.delete('/maintenances/:id', findMaintenanceId, deleteMaintenance);

export default router;