import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Ride capacity must be greater than 0.'],
            max: [1000, 'Ride capacity max is 1000.']
        },
        minHeight: {
            type: Number,
            required: true,
            min: [40, 'Lowest required height is 40.'],
            max: [300, 'Highest required height is 300']
        },
        duration: {
            type: Number,
            required: true,
            min: [0, 'Duration must be 0 or greater.'],
            max: [3600, 'Duration max is 3600.']
        },
        status: {
            type: String,
            required: true,
            lowercase: true,
            enum: ['open', 'maintenance', 'closed']
        }
    },
    {
        timestamps: true
    }
);

export const Ride = mongoose.model('Ride', rideSchema);
