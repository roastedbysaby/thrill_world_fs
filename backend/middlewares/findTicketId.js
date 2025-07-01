import mongoose from 'mongoose';
import { Ticket } from '../models/Ticket.js';

export const findTicketId = async (req, res, next) =>{
    try {
        const ticketId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(ticketId)) return res.status(400).json({ message: 'Invalid ticket id format.' });

        const ticket = await Ticket.findById(ticketId);
    
        if (!ticket) return res.status(404).json({ message: `${ticketId} not found.` });
    
        req.ticket = ticket;
        next();

    } catch(error) {
        console.error('Error in ticket middleware.');
        next(error);
    };
};