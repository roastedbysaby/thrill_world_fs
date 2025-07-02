import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import mongoose from 'mongoose';
import express from 'express';
import ridesRouter from './routes/RideRoute.js';
import visitorsRouter from './routes/VisitorRoute.js';
import ticketsRouter from './routes/TicketRoute.js';
import employeesRouter from './routes/EmployeeRoute.js';
import maintenancesRouter from './routes/MaintenanceRoute.js';
import authRouter from './routes/AuthRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DATABASE_URI;

mongoose.connect(DB_URI)
.then(() => {
    console.log('MongoDB connected.');
    app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}.`);
});
})
.catch(err => console.error('MongoDB connection error.', err));

app.use(express.json());

app.use('/api', ridesRouter);
app.use('/api', visitorsRouter);
app.use('/api', ticketsRouter);
app.use('/api', employeesRouter);
app.use('/api', maintenancesRouter);
app.use('/api', authRouter);