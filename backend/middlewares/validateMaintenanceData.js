import mongoose from 'mongoose';
import { Ride } from '../models/Ride.js';
import { Employee } from '../models/Employee.js';
import { validateDate } from '../utils/validateDate.js';

export const validateMaintenanceData = async (req, res, next) =>{
    try{
        const { rideId, employeeId, date: stringDate, description, status } = req.body;
        const descriptionTrim = description? description.trim() : '';
        const statusTrim = status? status.trim() : '';

        if (!rideId ||
            !employeeId ||
            !stringDate ||
            !descriptionTrim ||
            !statusTrim){
                return res.status(400).json({ message: 'Invalid fields.' });
            };

        if (!mongoose.Types.ObjectId.isValid(rideId)) return res.status(400).json({ message: 'Invalid ride id format.' });
        const ride = await Ride.findById(rideId);
        if (!ride) return res.status(404).json({ message: `Ride id ${rideId} not found.` });

        if (!mongoose.Types.ObjectId.isValid(employeeId)) return res.status(400).json({ message: 'Invalid employee id format.' });
        const employee = await Employee.findById(employeeId);
        if (!employee) return res.status(404).json({ message: `Employee id ${employeeId} not found.` });

        const date = validateDate(stringDate);
        if (typeof date === 'string') return res.status(400).json({ message: date });

        req.validatedMaintenanceBody = {
            rideId,
            employeeId,
            date,
            description: descriptionTrim,
            status: statusTrim
        };
        next();

    } catch(error) {
        console.error('Error occurred in validate maintenance data.');
        next(error);
        // res.status(500).json({ message: 'Error occurred in validate maintenance data.' });
    };
};