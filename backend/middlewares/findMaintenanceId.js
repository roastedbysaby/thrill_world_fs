import { maintenances } from '../models/Maintenance.js';

export const findMaintenanceId = async (req, res, next) =>{
    try {
        const maintenanceId = parseInt(req.params.id);
        const maintenance = maintenances.find(m => m.id === maintenanceId);
    
        if (!maintenance) return res.status(404).json({ message: `Maintenance id ${maintenanceId} not found.` });
    
        req.maintenance = maintenance;
        next();
    } catch(error) {
        console.error('Error in maintenance middleware.');
        next(error);
    };
};