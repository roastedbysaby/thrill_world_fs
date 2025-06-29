import { visitors } from '../models/Visitor.js';

export const findVisitorId = (req, res, next) =>{
    try {
        const visitorId = parseInt(req.params.id);
        const visitor = visitors.find(v => v.id === visitorId);
    
        if (!visitor) return res.status(404).json({ message: `${visitorId} not found.` });
    
        req.visitor = visitor;
        next();
    } catch(error) {
        console.error('Error in visitor middleware.');
        next(error);
    };
};