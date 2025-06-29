import { employees } from '../models/Employee.js';

export const findEmployeeId = (req, res, next) =>{
    try {
        const employeeId = parseInt(req.params.id);
        const employee = employees.find(e => e.id === employeeId);
    
        if (!employee) return res.status(404).json({ message: `${employeeId} not found.` });
    
        req.employee = employee;
        next();
        
    } catch(error) {
        console.error('Error in employee middleware.');
        next(error);
    };
};