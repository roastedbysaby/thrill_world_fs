import express from 'express';
import { createEmployee, getAllEmployees, getSingleEmployee, updateEmployee, deleteEmployee } from '../controllers/EmployeeController.js';
import { findEmployeeId } from '../middlewares/findEmployeeId.js';
import { validateEmployeeData } from '../middlewares/validateEmployeeData.js';

const router = express.Router();

router.post('/employees', validateEmployeeData(false), createEmployee);

router.get('/employees', getAllEmployees);

router.get('/employees/:id', findEmployeeId, getSingleEmployee);

router.put('/employees/:id', findEmployeeId, validateEmployeeData(true), updateEmployee);

router.delete('/employees/:id', findEmployeeId, deleteEmployee);

export default router;