import { rides } from '../models/Ride.js';

export const findRideId = (req, res, next) =>{
    try{
        const rideId = parseInt(req.params.id);
        const ride = rides.find(r => r.id === rideId);
    
        if (!ride) return res.status(404).json({ message: `${rideId} not found.` });
        
        req.ride = ride;
        next();
    } catch(error) {
        console.error('Error in ride middleware.');
        next(error);
    };
};