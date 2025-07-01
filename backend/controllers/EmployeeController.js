import { Employee } from '../models/Employee.js';

export const createEmployee = async (req, res) =>{
    try {
        const newEmployee = await Employee.create(req.validatedEmployeeBody);

        res.status(201).json({
            message: `Employee ${newEmployee.name} added.`,
            employee: newEmployee
        });
        console.log('Employee added.');
        
    } catch(error) {
        console.error('Error adding employee.');
        res.status(500).json({ error: 'Error adding employee.' });
    };
};

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);

    } catch(error) {
        console.error('Error retrieving all employees.');
        res.status(500).json({ message: 'Error retrieving all employees.' });
    };
};

export const getSingleEmployee = (req, res) => {
    try {
        res.status(200).json(req.employee);

    } catch(error) {
        console.error('Error retrieving the employee.');
        res.status(500).json({ message: 'Error retrieving the employee.' });
    };
};

export const updateEmployee = async (req, res, next) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.validatedEmployeeBody,
            {
                new: true,
                runValidators: true,
                overwrite: true
            }
        );

        console.log('Employee updated.');
        res.status(200).json(updatedEmployee);
    } catch(error) {
        console.error('Error updating employee.');
        next(error);
        // res.status(500).json({ message: 'Error updating employee.' });
    };
};

export const deleteEmployee = async (req, res, next) =>{
    try {
        const employeeToDelete = await Employee.findByIdAndDelete(req.params.id);
        res.status(204).send();
        console.log('Employee deleted.');

    } catch(error) {
        console.error('Error deleting employee.');
        next(error);
        // res.status(500).json({ message: 'Error deleting employee.' });
    };
};