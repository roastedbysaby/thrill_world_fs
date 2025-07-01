import mongoose from 'mongoose';
import { Maintenance } from '../models/Maintenance.js';

export const findMaintenanceId = async (req, res, next) =>{
    try {
        const maintenanceId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(maintenanceId)) return res.status(400).json({ message: 'Invalid maintenance id format.' });

        const maintenance = await Maintenance.findById(maintenanceId);
    
        if (!maintenance) return res.status(404).json({ message: `Maintenance id ${maintenanceId} not found.` });
    
        req.maintenance = maintenance;
        next();
        
    } catch(error) {
        console.error('Error in maintenance middleware.');
        next(error);
    };
};