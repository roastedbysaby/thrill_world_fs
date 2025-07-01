import mongoose from 'mongoose';
import { Visitor } from '../models/Visitor.js';

export const findVisitorId = async (req, res, next) =>{
    try {
        const visitorId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(visitorId)){
            return res.status(400).json({ message: 'Invalid visitor id format.' });
        }

        const visitor = await Visitor.findById(visitorId);
    
        if (!visitor) return res.status(404).json({ message: `${visitorId} not found.` });
    
        req.visitor = visitor;
        next();
    } catch(error) {
        console.error('Error in visitor middleware.');
        next(error);
    };
};