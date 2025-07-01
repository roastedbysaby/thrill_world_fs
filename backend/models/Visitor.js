import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            // unique: true
        },
        age: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        }
    }
);

export const Visitor = mongoose.model('Visitor', visitorSchema);
