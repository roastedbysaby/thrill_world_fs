import { visitors } from '../models/Visitor.js';
import { validateDate } from '../utils/validateDate.js';

export const validateTicketData = (req, res, next) =>{
    try {
        const { visitorId: stringVisitorId, type, price: stringPrice, purchaseDate: stringPurchaseDate, validUntil: stringValidUntil } = req.body;
        const typeTrim = type? type.trim() : '';

        if (!stringVisitorId ||
            !typeTrim ||
            !stringPrice ||
            !stringPurchaseDate ||
            !stringValidUntil){
                return res.status(400).json({ message: 'Invalid fields.' });
            };

        const visitorId = parseInt(stringVisitorId);
        if (isNaN(visitorId)) return res.status(400).json({ message: 'Invalid visitor id.' });

        const visitor = visitors.find(v => v.id === visitorId);
        if (!visitor) return res.status(404).json({ message: `Visitor id ${visitorId} not found.` });

        const price = parseFloat(stringPrice);
        if (isNaN(price) || price < 0) return res.status(400).json({ message: 'Invalid price.' });

        const purchaseDate = validateDate(stringPurchaseDate);
        if (typeof purchaseDate === 'string') return res.status(400).json({ message: purchaseDate }); 

        const validUntil = validateDate(stringValidUntil);
        if (typeof validUntil === 'string') return res.status(400).json({ message: validUntil });

        req.validatedTicketBody = {
            visitorId,
            type: typeTrim,
            price,
            purchaseDate,
            validUntil
        };
        next();

    } catch(error) {
        console.error('Error occurred.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};