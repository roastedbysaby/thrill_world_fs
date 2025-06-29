import { rides } from '../models/Ride.js';

export const validateRideData = (isUpdate = false) =>{
    return (req, res, next) =>{
        try {
            const { name, capacity: stringCapacity, minHeight: stringMinHeight, duration: stringDuration, status } = req.body;
            const nameTrim = name ? name.trim() : '';
            const statusTrim = status ? status.trim() : '';
    
            if (!nameTrim ||
                !stringCapacity ||
                !stringMinHeight ||
                !stringDuration ||
                !statusTrim){
                    return res.status(400).json({ message: 'Invalid fields.' });
                };
    
            if (!isUpdate){
                const exists = rides.find(r => r.name.toLowerCase() === nameTrim.toLowerCase());
                if (exists) return res.status(409).json({ message: `${nameTrim} already exists.` });
            } else {
                const existingRename = rides.find(r => r.name.toLowerCase() === nameTrim.toLowerCase() && r.id !== req.ride.id);
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
            console.error('Error occurred.');
            res.status(500).json({ message: 'Error occurred.' });
        };
    };
};