import { Ticket, tickets } from '../models/Ticket.js';

export const createTicket = async (req, res) =>{
    try{   
        const newId = tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1;
        const { visitorId, ...ticketData } = req.validatedTicketBody;
        const ticket = new Ticket(newId, visitorId, ticketData );

        tickets.push(ticket);
        res.status(201).json({ message: `Ticket ${ticket.id} added to visitor ${visitorId}.` });
    } catch(error) {
        console.error('Error creating ticket.');
        res.status(500).json({ message: 'Couldnt add ticket.' });
    };
};

export const getAllTickets = async (req, res) =>{
    try {
        res.status(200).json(tickets);
    } catch(error) {
        console.error('Error fetching tickets.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};

export const getSingleTicket = async (req, res) =>{
    try {
        res.status(200).json(req.ticket);
    } catch(error) {
        console.error('Error fetching the ticket.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};

export const updateTicket = async (req, res) =>{
    try {
        const ticketIndex = tickets.findIndex(t => t.id === req.ticket.id);
        const { visitorId, ...ticketData } = req.validatedTicketBody;

        tickets[ticketIndex] = new Ticket(req.ticket.id, visitorId, ticketData);
        res.status(200).json(tickets[ticketIndex]);
    } catch(error) {
        console.error('Error updating ticket.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};

export const deleteTicket = async (req, res) =>{
    try {
        const ticketIndex = tickets.findIndex(t => t.id === req.ticket.id);
    
        tickets.splice(ticketIndex, 1);
        res.status(204).send();
        console.log('Ticket deleted.');
    } catch(error) {
        console.error('Error deleting ticket.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};