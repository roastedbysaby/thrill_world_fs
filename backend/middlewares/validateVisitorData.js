import mongoose from 'mongoose';
import { Visitor } from '../models/Visitor.js';

export const validateVisitorData = async (req, res, next) =>{
    try {
        const { name, age: stringAge, height: stringHeight } = req.body;
        const nameTrim = name ? name.trim() : '';
        const isUpdate = req.method === 'PUT';

        if (!nameTrim ||
            !stringAge ||
            !stringHeight){
                return res.status(400).json({ message: 'Invalid fields.' });
            };

        if (!isUpdate){
            const exists = await Visitor.findOne({
                name: { $regex: new RegExp(`^${nameTrim}$`, 'i') }
            });
            if (exists) return res.status(409).json({ message: `${nameTrim} already exists.` });

        } else {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)){
                return res.status(400).json({ message: 'Invalid visitor id format.' });
            };

            const existingRename = await Visitor.findOne({
                name: { $regex: new RegExp(`^${nameTrim}`, 'i') },
                _id: { $ne: req.params.id }
            });

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
        console.error('Error in validate visitor data.');
        next(error);
        // res.status(500).json({ message: 'Error in validate visitor data.' });
    };
};
