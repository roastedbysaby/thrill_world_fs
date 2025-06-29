import { employees } from '../models/Employee.js';

export const validateEmployeeData = (isUpdate = false) =>{
    return (req, res, next) =>{
        try {
            const { name, position, department } = req.body;
            const nameTrim = name? name.trim() : '';
            const positionTrim = position? position.trim() : '';
            const departmentTrim = department? department.trim() : '';
    
            if (!nameTrim ||
                !positionTrim ||
                !departmentTrim){
                    return res.status(400).json({ message: 'Invalid fields.' });
                };
    
            if (!isUpdate){
                const exists = employees.find(e => e.name.toLowerCase() === nameTrim.toLowerCase());
                if (exists) return res.status(409).json({ message: `${nameTrim} already exists.` });
            } else {
                const existingRename = employees.find(e => e.name.toLowerCase() === nameTrim.toLowerCase() && e.id !== req.employee.id);
                if (existingRename) return res.status(409).json({ message: `${nameTrim} already exists.` });
            };
    
            req.validatedEmployeeBody = {
                name: nameTrim,
                position: positionTrim,
                department: departmentTrim
            };
            next();
            
        } catch(error) {
            console.error('Error occurred.');
            res.status(500).json({ message: 'Error occurred.' });
        };
    };
};