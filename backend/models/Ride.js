import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        capacity: {
            type: Number,
            required: true
        },
        minHeight: {
            type: Number,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Ride = mongoose.model('Ride', rideSchema);
