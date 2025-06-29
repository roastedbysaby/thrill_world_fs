import { Visitor, visitors } from '../models/Visitor.js';

export const createVisitor = async (req, res) =>{
    try {
        const newId = visitors.length > 0 ? Math.max(...visitors.map(v => v.id)) + 1 : 1;
        const newVisitor = new Visitor(newId, req.validatedVisitorBody);

        visitors.push(newVisitor);
        res.status(201).json(newVisitor);
    } catch (error) {
        console.error('Error creating visitor.');
        res.status(500).json({ error: 'Couldnt add visitor' });
    };
};

export const getAllVisitors = async (req, res) =>{
    try {
        res.status(200).json(visitors);
    } catch(error) {
        console.error('Error fetching visitors.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};

export const getSingleVisitor = async (req, res) =>{
    try {
        res.status(200).json(req.visitor);
    } catch(error) {
        console.error('Error fetching the visitor.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};

export const updateVisitor = async (req, res) =>{
    try {
        const visitorIndex = visitors.findIndex(v => v.id === req.visitor.id);

        visitors[visitorIndex] = new Visitor(req.visitor.id, req.validatedVisitorBody);
        res.status(200).json(visitors[visitorIndex]);

    } catch(error) {
        console.error('Error updating visitor.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};

export const deleteVisitor = async (req, res) =>{
    try {
        const visitorIndex = visitors.findIndex(v => v.id === req.visitor.id);
    
        visitors.splice(visitorIndex, 1);
        res.status(204).send();
        console.log('Visitor deleted.');
    } catch(error) {
        console.error('Error deleting visitor.');
        res.status(500).json({ message: 'Error occurred.' });
    }
};