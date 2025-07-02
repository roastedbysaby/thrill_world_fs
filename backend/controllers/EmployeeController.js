import { Employee } from '../models/Employee.js';
import { getHashedDefaultPassword } from '../utils/hashDefaultPassword.js';

export const employeeController = {
    createEmployee: async (req, res) =>{
        try {
            const hashedPassword = await getHashedDefaultPassword();
            const newEmployee = await Employee.create({ ...req.validatedEmployeeBody, password: hashedPassword });

            res.status(201).json({
                message: `Employee ${newEmployee.name} added.`,
                employee: newEmployee
            });
            console.log('Employee added.');
            
        } catch(error) {
            console.error('Error adding employee.');
            res.status(500).json({ error: 'Error adding employee.' });
        };
    },

    getAllEmployees: async (req, res) => {
        try {
            const employees = await Employee.find();
            res.status(200).json(employees);

        } catch(error) {
            console.error('Error retrieving all employees.');
            res.status(500).json({ message: 'Error retrieving all employees.' });
        };
    },

    getSingleEmployee: (req, res) => {
        try {
            res.status(200).json(req.employee);

        } catch(error) {
            console.error('Error retrieving the employee.');
            res.status(500).json({ message: 'Error retrieving the employee.' });
        };
    },

    updateEmployee: async (req, res, next) => {
        try {
            // if (resetPassword){
            //     const hashedPassword = await getHashedDefaultPassword;
            // };

            const updatedEmployee = await Employee.findByIdAndUpdate(
                req.params.id,
                req.validatedEmployeeBody,
                {
                    new: true,
                    runValidators: true
                }
            );

            console.log('Employee updated.');
            res.status(200).json(updatedEmployee);
        } catch(error) {
            console.error('Error updating employee.');
            next(error);
            // res.status(500).json({ message: 'Error updating employee.' });
        };
    },

    deleteEmployee: async (req, res, next) =>{
        try {
            const employeeToDelete = await Employee.findByIdAndDelete(req.params.id);
            res.status(204).send();
            console.log('Employee deleted.');

        } catch(error) {
            console.error('Error deleting employee.');
            next(error);
            // res.status(500).json({ message: 'Error deleting employee.' });
        };
    }
};
