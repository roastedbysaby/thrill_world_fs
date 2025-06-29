import express from 'express';
import { createRide, getAllRides, getSingleRide, updateRide, deleteRide } from '../controllers/RideController.js';
import { findRideId } from '../middlewares/findRideId.js';
import { validateRideData } from '../middlewares/validateRideData.js';

const router = express.Router();

router.post('/rides', validateRideData(false), createRide);

router.get('/rides', getAllRides);

router.get('/rides/:id', findRideId, getSingleRide);

router.put('/rides/:id', findRideId, validateRideData(true), updateRide);

router.delete('/rides/:id',findRideId, deleteRide);

export default router;