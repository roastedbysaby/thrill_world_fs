import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
    {
        visitorId: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        purchaseDate: {
            type: Date,
            required: true
        },
        validUntil: {
            type: Date,
            required: true
        }
    }
);

export const Ticket = mongoose.model('Ticket', ticketSchema);
