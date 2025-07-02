import mongoose from 'mongoose';
import { Employee } from '../models/Employee.js';

export const validateEmployeeData = async (req, res, next) =>{
    try {
        const { name, email, position, department } = req.body;
        const nameTrim = name? name.trim() : '';
        const emailTrim = email? email.trim().toLowerCase() : '';
        const emailRegex = /^[a-zA-Z0-9]+(?:[.-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.(?=.{2,63}$)[a-zA-Z0-9](?:-[a-zA-Z0-9]+)*$/;
        const positionTrim = position? position.trim() : '';
        const departmentTrim = department? department.trim() : '';
        const isUpdate = req.method === 'PUT';

        if (!nameTrim ||
            !emailTrim ||
            !positionTrim ||
            !departmentTrim){
                return res.status(400).json({ message: 'Invalid fields.' });
            };
            
        if (!emailRegex.test(emailTrim)) return res.status(400).json({ message: 'Invalid email format.' });

        const existingEmail = await Employee.findOne({
            email: emailTrim,
            _id: { $ne: req.params.id }
        });
        if (existingEmail) return res.status(400).json({ message: 'Email already in use.' });

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
            email: emailTrim,
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
