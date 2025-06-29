import express from 'express';
import { createTicket, getAllTickets, getSingleTicket, updateTicket, deleteTicket } from '../controllers/TicketController.js';
import { findTicketId } from '../middlewares/findTicketId.js';
import { validateTicketData } from '../middlewares/validateTicketData.js';

const router = express.Router();

router.post('/tickets', validateTicketData, createTicket);

router.get('/tickets', getAllTickets);

router.get('/tickets/:id', findTicketId, getSingleTicket);

router.put('/tickets/:id', findTicketId, validateTicketData, updateTicket);

router.delete('/tickets/:id', findTicketId, deleteTicket);

export default router;