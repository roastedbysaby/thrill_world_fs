import mongoose from 'mongoose';
import { Ride } from '../models/Ride.js';

export const validateRideData = async (req, res, next) =>{
    try {
        const { name, capacity: stringCapacity, minHeight: stringMinHeight, duration: stringDuration, status } = req.body;
        const nameTrim = name ? name.trim() : '';
        const statusTrim = status ? status.trim() : '';
        const isUpdate = req.method === 'PUT';

        if (!nameTrim ||
            !stringCapacity ||
            !stringMinHeight ||
            !stringDuration ||
            !statusTrim){
                return res.status(400).json({ message: 'Invalid fields.' });
            };

        if (!isUpdate){
            const exists = await Ride.findOne({
                name: { $regex: new RegExp(`^${nameTrim}$`, 'i') }
            });
            
            if (exists) return res.status(409).json({ message: `${nameTrim} already exists.` });
            
        } else {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)){
                return res.status(400).json({ message: 'Invalid ride id.' });
            };

            const existingRename = await Ride.findOne({
                name: { $regex: new RegExp(`^${nameTrim}$`, 'i') },
                _id: { $ne: req.params.id }
            });

            if (existingRename) return res.status(409).json({ message: `${nameTrim} already exists.` });
        }

        const capacity = parseInt(stringCapacity);
        if (isNaN(capacity) || capacity < 0) return res.status(400).json({ message: 'Invalid capacity.' });
        
        const minHeight = parseInt(stringMinHeight);
        if (isNaN(minHeight) || minHeight <= 0) return res.status(400).json({ message: 'Invalid min height.' }); 
        
        const duration = parseInt(stringDuration);
        if (isNaN(duration) || duration <= 0) return res.status(400).json({ message: 'Invalid duration.' });

        req.validatedRideBody = {
            name: nameTrim,
            capacity,
            minHeight,
            duration,
            status: statusTrim
        };
        next();

    } catch(error) {
        console.error('Error in validateRideData.');
        next(error);
        // res.status(500).json({ message: 'Error in validateRideData.' });
    };
};
