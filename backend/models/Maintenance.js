import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema(
    {
        rideId: {
            type: String,
            required: true,
        },
        employeeId: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    }
);

export const Maintenance = mongoose.model('Maintenance', maintenanceSchema);
