import { visitors } from '../models/Visitor.js';

export const validateVisitorData = (isUpdate = false) =>{
    return (req, res, next) =>{
        try {
            const { name, age: stringAge, height: stringHeight } = req.body;
            const nameTrim = name ? name.trim() : '';
    
            if (!nameTrim ||
                !stringAge ||
                !stringHeight){
                    return res.status(400).json({ message: 'Invalid fields.' });
                };
    
            if (!isUpdate){
                const exists = visitors.find(v => v.name.toLowerCase() === nameTrim.toLowerCase());
                if (exists) return res.status(409).json({ message: `${nameTrim} already exists.` });
            } else {
                const existingRename = visitors.find(v => v.name.toLowerCase() === nameTrim.toLowerCase() && v.id !== req.visitor.id);
                if (existingRename) return res.status(409).json({ message: `${nameTrim} already exists.` });
            };
    
    
            const age = parseInt(stringAge);
            const height = parseInt(stringHeight);
    
            if (isNaN(age) || age < 0) return res.status(400).json({ message: 'Invalid age.' });
            if (isNaN(height) || height <= 0) return res.status(400).json({ message: 'Invalid height.' });
    
            req.validatedVisitorBody = {
                name: nameTrim,
                age,
                height
            };
            next();
    
        } catch(error) {
            console.error('Error occurred.');
            res.status(500).json({ message: 'Error occurred.' });
        };
    };
};