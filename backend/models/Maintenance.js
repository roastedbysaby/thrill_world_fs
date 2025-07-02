import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema(
    {
        rideId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: true,
            lowercase: true
        },
        status: {
            type: String,
            required: true,
            enum: ['pending approval', 'in-progress', 'completed']
        }
    },
    {
        timestamps: true
    }
);

export const Maintenance = mongoose.model('Maintenance', maintenanceSchema);
