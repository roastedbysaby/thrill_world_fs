import express from 'express';
import { employeeController } from '../controllers/EmployeeController.js';
import { findEmployeeId } from '../middlewares/findEmployeeId.js';
import { validateEmployeeData } from '../middlewares/validateEmployeeData.js';

const { createEmployee, getAllEmployees, getSingleEmployee, updateEmployee, deleteEmployee } = employeeController;
const router = express.Router();

router.post('/employees', validateEmployeeData, createEmployee);

router.get('/employees', getAllEmployees);

router.get('/employees/:id', findEmployeeId, getSingleEmployee);

router.put('/employees/:id', findEmployeeId, validateEmployeeData, updateEmployee);

router.delete('/employees/:id', findEmployeeId, deleteEmployee);

export default router;