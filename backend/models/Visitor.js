import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        age: {
            type: Number,
            required: true,
            min: [2, 'Age must be greather than 1.'],
            max: [150, 'Maximum age is 150.']
        },
        height: {
            type: Number,
            required: true,
            min: [0, 'Height must be greater than 0.'],
            max: [300, 'Height must be lower than 300.']
        }
    },
    {
        timestamps: true
    }
);

export const Visitor = mongoose.model('Visitor', visitorSchema);
