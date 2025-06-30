import mongoose from 'mongoose';
import { Employee } from '../models/Employee.js';

export const validateEmployeeData = async (req, res, next) =>{
    try {
        const { name, position, department } = req.body;
        const nameTrim = name? name.trim() : '';
        const positionTrim = position? position.trim() : '';
        const departmentTrim = department? department.trim() : '';
        const isUpdate = req.method === 'PUT';

        if (!nameTrim ||
            !positionTrim ||
            !departmentTrim){
                return res.status(400).json({ message: 'Invalid fields.' });
            };

        if (!isUpdate){
            const exists = await Employee.findOne({
                name: { $regex: new RegExp(`^${nameTrim}$`, 'i') }
            });

            if (exists) return res.status(409).json({ message: `${nameTrim} already exists.` });
            
        } else {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)){
                return res.status(400).json({ message: 'Invalid employee id.' });
            };

            const existingRename = await Employee.findOne({
                name: { $regex: new RegExp(`^${nameTrim}$`, 'i') },
                _id: { $ne: req.params.id }
            });

            if (existingRename) return res.status(409).json({ message: `${nameTrim} already exists.` });
        };

        req.validatedEmployeeBody = {
            name: nameTrim,
            position: positionTrim,
            department: departmentTrim
        };
        next();
        
    } catch(error) {
        console.error('Error in validate employee data.');
        next(error);
        // res.status(500).json({ message: 'Error in validate employee data.' });
    };
};
