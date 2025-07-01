import { Maintenance } from '../models/Maintenance.js';

export const createMaintenance = async (req, res) =>{
    try {
        const newMaintenance = await Maintenance.create(req.validatedMaintenanceBody);

        res.status(201).json({
            message: `Maintenance ${newMaintenance.description} added.`,
            maintenance: newMaintenance
        });
        console.log('Maintenance added.');

    } catch(error) {
        console.error('Error adding maintenance.');
        res.status(500).json({ message: 'Error adding maintenace.' });
    };
};

export const getAllMaintenances = async (req, res) =>{
    try {
        const maintenances = await Maintenance.find();
        res.status(200).json(maintenances);

    } catch(error) {
        console.error('Error retrieving all maintenances.');
        res.status(500).json({ message: 'Error retrieving all maintenaces.' });
    };
};

export const getSingleMaintenance = (req, res) =>{
    try {
        res.status(200).json(req.maintenance);

    } catch(error) {
        console.error('Error retrieving the maintenance.');
        res.status(500).json({ message: 'Error retrieving the maintenance.' });
    };
};

export const updateMaintenance = async (req, res, next) =>{
    try {
        const updatedMaintenance = await Maintenance.findByIdAndUpdate(
            req.params.id,
            req.validatedMaintenanceBody,
            {
                new: true,
                runValidators: true,
                overwrite: true
            }
        );
    
        res.status(200).json(updatedMaintenance);
        console.log('Maintenance updated');

    } catch(error) {
        console.error('Error updating maintenance.');
        next(error);
        // res.status(500).json({ message: 'Error updating maintenace.' });
    };
};

export const deleteMaintenance = async (req, res, next) =>{
    try {
        const maintenanceToDelete = await Maintenance.findByIdAndDelete(req.params.id);
        res.status(204).send();
        console.log('Maintenance deleted.');

    } catch(error) {
        console.error('Error deleting maintenance.');
        next(error);
        // res.status(500).json({ message: 'Error deleting maintenance.' });
    };
};