import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            // unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^[a-zA-Z0-9]+(?:[.-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.(?=.{2,63}$)[a-zA-Z0-9](?:-[a-zA-Z0-9]+)*$/, 'Invalid email format']
        },
        password: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
            lowercase: true,
            enum: ['cashier', 'janitor', 'operator', 'manager', 'accountant', 'employee'],
            default: 'employee'
        },
        department: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            enum: ['it', 'maintenance', 'field', 'administration', 'finance', 'general'],
            default: 'general'
        }
    },
    {
        timestamps: true
    }
);

export const Employee = mongoose.model('Employee', employeeSchema);
