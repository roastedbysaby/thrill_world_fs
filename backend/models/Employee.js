import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            // unique: true
        },
        position: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true
        }
    }
);

export const Employee = mongoose.model('Employee', employeeSchema);

export const employees = [
    
];