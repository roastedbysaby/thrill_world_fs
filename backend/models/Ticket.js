import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
    {
        visitorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        type: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            enum: ['promo', 'daily', 'seasonal', 'yearly']
        },
        price: {
            type: Number,
            required: true,
            min: [0, 'Price must be positive.'],
            max: [1000, 'Price must be lower or equal to 1000.']
        },
        purchaseDate: {
            type: Date,
            required: true
        },
        validUntil: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Ticket = mongoose.model('Ticket', ticketSchema);
