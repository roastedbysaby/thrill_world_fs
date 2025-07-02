import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Employee } from '../models/Employee.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const authController = {
    register: async (req, res) =>{
        try {
            const { name, email, password } = req.body;
            const emailRegex = /^[a-zA-Z0-9]+(?:[.-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.(?=.{2,63}$)[a-zA-Z0-9](?:-[a-zA-Z0-9]+)*$/;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            
            const nameTrim = name? name.trim().toLowerCase() : '';
            const emailTrim = email? email.trim().toLowerCase() : '';
            const passwordTrim = password? password.trim() : '';
            
            if (!nameTrim||
                !emailTrim||
                !passwordTrim){
                    return res.status(400).json({ message: 'Invalid fields' });
                };

            if (!emailRegex.test(emailTrim)) return res.status(400).json({ message: 'Invalid email format' });
            
            const existingUser = await Employee.findOne({ email: emailTrim });
            if (existingUser) return res.status(400).json({ message: 'User already exists.' });

            if (!passwordRegex.test(passwordTrim)) return res.status(400).json({ message: 'Invalid password format' }); 

            const hashedPassword = await bcrypt.hash(passwordTrim, 10);

            const newUser = new Employee({
                name: nameTrim,
                email: emailTrim,
                password: hashedPassword
            });

            await newUser.save();
            console.log('User registered');
            res.status(201).json({ message: 'User registered' });
            
        } catch(error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        };
    },

    login: async (req, res) =>{
        try {
            const { email, password } = req.body;
            const user = await Employee.findOne({ email });
            if (!user) return res.status(400).json({ message: 'Invalid email or password' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid email or password'});

            const token = jwt.sign(
                { userId: user._id, email: user.email },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({ token });

        } catch(error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        };
    },

    forgotPassword: async (req, res) =>{
        try {
            const { email } = req.body;
            const user = await Employee.findOne({ email });

            if (!user) return res.status(404).json({ message: 'No user found with that email' });

            const resetToken = jwt.sign(
                { userId: user._id },
                JWT_SECRET,
                { expiresIn: '15m'}
            );

            const resetUrl = `http://localhost:3001/reset-password/${resetToken}`;

            console.log('Password reset link sent');
            res.status(200).json({ message: 'Password reset link sent', resetUrl });

        } catch(error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        };
    },

    resetPassword: async (req, res) =>{
        try {
            const { token } = req.params;
            const { newPassword } = req.body;

            const decoded = jwt.verify(token, JWT_SECRET);
            const user = await Employee.findById(decoded.userId);

            if (!user) return res.status(404).json({ message: 'User not found' });

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();

            res.status(200).json({ message: 'Password changed successfully' });

        } catch(error) {
            console.error(error);
            if (error.name === 'TokenExpiredError') return res.status(400).json({ message: 'Reset link expired' });
            
            res.status(500).json({ message: 'Server error' });
        }
    }
};
