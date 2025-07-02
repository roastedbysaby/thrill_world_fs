import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^[a-zA-Z0-9]+(?:[.-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.(?=.{2,63}$)[a-zA-Z0-9](?:-[a-zA-Z0-9]+)*$/.test(email.trim())]
        },
        password: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true,
            lowercase: true,
            enum: ['IT', 'maintenance', 'field', 'administration', 'finance']
        },
        role: {
            type: String,
            required: true,
            lowercase: true,
            enum: ['cashier', 'janitor', 'operator', 'manager', 'accountant']
        }
    }
);

export const User = mongoose.model('User', userSchema);
