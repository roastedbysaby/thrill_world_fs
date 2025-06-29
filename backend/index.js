import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import express from 'express';
import ridesRouter from './routes/RideRoute.js';
import visitorsRouter from './routes/VisitorRoute.js';
import ticketRouter from './routes/TicketRoute.js';
import employeesRouter from './routes/EmployeeRoute.js';
import maintenanceRouter from './routes/MaintenanceRoute.js';
// import User from './models/User.js';

async function createUser(){
    try {
        const newUser = new User({
            name: 'Fred'
        });

        const savedUser = await newUser.save();
        console.log('User saved.');
    } catch(error) {
        console.error('Error creating user.');
    };
};

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(DB_URL)
.then(() => console.log('MongoDB connected.'))
.catch(err => console.error('MongoDB connection error.', err));

app.use(express.json());

app.use('/api', ridesRouter);
app.use('/api', visitorsRouter);
app.use('/api', ticketRouter);
app.use('/api', employeesRouter);
app.use('/api', maintenanceRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${port}.`);
});
