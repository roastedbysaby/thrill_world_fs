import { Ticket } from '../models/Ticket.js';

export const createTicket = async (req, res) =>{
    try{   
        const newTicket = await Ticket.create(req.validatedTicketBody);
        
        res.status(201).json({
            message: `Ticket ${newTicket.id} added to visitor ${req.validatedTicketBody.visitorId}.`,
            ticket: newTicket
        });
        console.log('Ticket added.');

    } catch(error) {
        console.error('Error adding ticket.');
        res.status(500).json({ message: 'Error adding ticket.' });
    };
};

export const getAllTickets = async (req, res) =>{
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);

    } catch(error) {
        console.error('Error retrieving all tickets.');
        res.status(500).json({ message: 'Error retrieving all tickets.' });
    };
};

export const getSingleTicket = (req, res) =>{
    try {
        res.status(200).json(req.ticket);

    } catch(error) {
        console.error('Error retrieving the ticket.');
        res.status(500).json({ message: 'Error retrieving the ticket.' });
    };
};

export const updateTicket = async (req, res, next) =>{
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.validatedTicketBody,
            {
                new: true,
                runValidators: true,
                overwrite: true
            }
        );

        res.status(200).json(updatedTicket);
        console.log('Ticket updated.');

    } catch(error) {
        console.error('Error updating ticket.');
        next(error);
        // res.status(500).json({ message: 'Error updating ticket.' });
    };
};

export const deleteTicket = async (req, res, next) =>{
    try {
        const ticketToDelete = await Ticket.findByIdAndDelete(req.params.id);

        res.status(204).send();
        console.log('Ticket deleted.');
    } catch(error) {
        console.error('Error deleting ticket.');
        next(error);
        // res.status(500).json({ message: 'Error deleting ticket.' });
    };
};