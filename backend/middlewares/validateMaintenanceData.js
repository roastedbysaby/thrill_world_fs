import { rides } from '../models/Ride.js';
import { employees } from '../models/Employee.js';
import { validateDate } from '../utils/validateDate.js';

export const validateMaintenanceData = (req, res, next) =>{
    try{
        const { rideId: stringRideId, employeeId: stringEmployeeId, date: stringDate, description, status } = req.body;
        const descriptionTrim = description? description.trim() : '';
        const statusTrim = status? status.trim() : '';

        if (!stringRideId ||
            !stringEmployeeId ||
            !stringDate ||
            !descriptionTrim ||
            !statusTrim){
                return res.status(400).json({ message: 'Invalid fields.' });
            };

        const rideId = parseInt(stringRideId);
        if (isNaN(rideId)) return res.status(400).json({ message: 'Invalid ride id.' });

        const ride = rides.find(r => r.id === rideId);
        if (!ride) return res.status(404).json({ message: `Ride id ${rideId} not found.` });

        const employeeId = parseInt(stringEmployeeId);
        if (isNaN(employeeId)) return res.status(400).json({ message: 'Invalid employee id.' });

        const employee = employees.find(e => e.id === employeeId);
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
        console.error('Error occurred.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};