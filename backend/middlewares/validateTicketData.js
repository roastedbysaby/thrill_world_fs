import mongoose from 'mongoose';
import { Visitor } from '../models/Visitor.js';
import { validateDate } from '../utils/validateDate.js';

export const validateTicketData = async (req, res, next) =>{
    try {
        const { visitorId, type, price: stringPrice, purchaseDate: stringPurchaseDate, validUntil: stringValidUntil } = req.body;
        const typeTrim = type? type.trim() : '';

        if (!visitorId ||
            !typeTrim ||
            !stringPrice ||
            !stringPurchaseDate ||
            !stringValidUntil){
                return res.status(400).json({ message: 'Invalid fields.' });
            };

        if (!mongoose.Types.ObjectId.isValid(visitorId)) return res.status(400).json({ message: 'Invalid visitor id format.' });
        
        const visitor = await Visitor.findById(visitorId);
        if (!visitor) return res.status(404).json({ message: `Visitor id ${visitorId} not found.` });

        const price = parseFloat(stringPrice);
        if (isNaN(price) || price < 0) return res.status(400).json({ message: 'Invalid price.' });

        const purchaseDate = validateDate(stringPurchaseDate);
        if (typeof purchaseDate === 'string') return res.status(400).json({ message: purchaseDate }); 

        const validUntil = validateDate(stringValidUntil);
        if (typeof validUntil === 'string') return res.status(400).json({ message: validUntil });

        if (validUntil <= purchaseDate) return res.status(400).json({ message: 'Valid date must be after purchase date.' });

        req.validatedTicketBody = {
            visitorId,
            type: typeTrim,
            price,
            purchaseDate,
            validUntil
        };
        next();

    } catch(error) {
        console.error('Error occurred in validate ticket data.');
        next(error);
        // res.status(500).json({ message: 'Error occurred in validate ticket data.' });
    };
};