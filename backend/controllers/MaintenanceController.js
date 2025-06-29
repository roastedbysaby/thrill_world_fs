import { Maintenance, maintenances } from '../models/Maintenance.js';

export const createMaintenance = async (req, res) =>{
    try {
        const { rideId, employeeId, ...maintenanceData } = req.validatedMaintenanceBody;
        const newId = maintenances.length > 0 ? Math.max(...maintenances.map(m => m.id)) + 1 : 1;
        const newMaintenance = new Maintenance(newId, rideId, employeeId, maintenanceData);

        maintenances.push(newMaintenance);
        res.status(201).json({ message: `Maintenance ${newMaintenance.description} added.` });
    } catch(error) {
        console.error('Error creating maintenance.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};

export const getAllMaintenances = async (req, res) =>{
    try {
        res.status(200).json(maintenances);
    } catch(error) {
        console.error('Error fetching maintenances.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};

export const getSingleMaintenance = async (req, res) =>{
    try {
        res.status(200).json(req.maintenance);
    } catch(error) {
        console.error('Error fetching the maintenance.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};

export const updateMaintenance = async (req, res) =>{
    try {
        const { rideId, employeeId, ...updateData } = req.validatedMaintenanceBody;
        const maintenanceIndex = maintenances.findIndex(m => m.id === req.maintenance.id);
    
        maintenances[maintenanceIndex] = new Maintenance(req.maintenance.id, rideId, employeeId, updateData);
        res.status(200).json(maintenances[maintenanceIndex]);
    } catch(error) {
        console.error('Error updating maintenance.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};

export const deleteMaintenance = async (req, res) =>{
    try {
        const maintenanceIndex = maintenances.findIndex(m => m.id === req.maintenance.id);
    
        maintenances.splice(maintenanceIndex, 1);
        res.status(204).send();
        console.log('Maintenance deleted.');
    } catch(error) {
        console.error('Error deleting maintenance.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};