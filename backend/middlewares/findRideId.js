import mongoose from 'mongoose';
import { Ride } from '../models/Ride.js';

export const findRideId = async (req, res, next) =>{
    try{
        const rideId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(rideId)){
            return res.status(400).json({ message: 'Invalid ride id format.' });
        };

        const ride = await Ride.findById(rideId);
    
        if (!ride) return res.status(404).json({ message: `${rideId} not found.` });
        
        req.ride = ride;
        next();
    } catch(error) {
        console.error('Error in ride middleware.');
        next(error);
    };
};