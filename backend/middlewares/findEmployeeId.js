import mongoose from 'mongoose';
import { Employee } from '../models/Employee.js';

export const findEmployeeId = async (req, res, next) =>{
    try {
        const employeeId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(employeeId)) return res.status(400).json({ message: 'Invalid employee id format.' });

        const employee = await Employee.findById(employeeId);
    
        if (!employee) return res.status(404).json({ message: `${employeeId} not found.` });
    
        req.employee = employee;
        next();
        
    } catch(error) {
        console.error('Error in employee middleware.');
        next(error);
    };
};