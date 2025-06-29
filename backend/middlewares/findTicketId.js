import { tickets } from '../models/Ticket.js';

export const findTicketId = async (req, res, next) =>{
    try {
        const ticketId = parseInt(req.params.id);
        const ticket = tickets.find(t => t.id === ticketId);
    
        if (!ticket) return res.status(404).json({ message: `${ticketId} not found.` });
    
        req.ticket = ticket;
        next();
    } catch(error) {
        console.error('Error in ticket middleware.');
        next(error);
    };
};