import { Employee, employees } from '../models/Employee.js';

export const createEmployee = async (req, res) =>{
    try {
        const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
        const newEmployee = new Employee(newId, req.validatedEmployeeBody);

        employees.push(newEmployee);
        res.status(201).json({ message: `Employee ${newEmployee.name} added.` });
    } catch(error) {
        console.error('Error occured.');
        res.status(500).json({ error: 'Couldnt add employee.' });
    };
};

export const getAllEmployees = async (req, res) => {
    try {
        res.status(200).json(employees);
    } catch(error) {
        console.error('Error fetching employees.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};

export const getSingleEmployee = async (req, res) => {
    try {
        res.status(200).json(req.employee);
    } catch(error) {
        console.error('Error fetching the employee.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};

export const updateEmployee = async (req, res) => {
    try {
        const employeeIndex = employees.findIndex(e => e.id === req.employee.id);

        employees[employeeIndex] = new Employee(req.employee.id, req.validatedEmployeeBody);
        res.status(200).json(employees[employeeIndex]);
    } catch(error) {
        console.error('Error updating employee.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};

export const deleteEmployee = async (req, res) =>{
    try {
        const employeeIndex = employees.findIndex(e => e.id === req.employee.id);
    
        employees.splice(employeeIndex, 1);
        res.status(204).send();
        console.log('Employee deleted.');
    } catch(error) {
        console.error('Error deleting employee.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};