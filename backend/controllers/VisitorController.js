import mongoose from 'mongoose';
import { Visitor } from '../models/Visitor.js';

export const createVisitor = async (req, res) =>{
    try {
        const newVisitor = await Visitor.create(req.validatedVisitorBody);

        res.status(201).json({
            message: `Visitor ${newVisitor.name} added.`,
            visitor: newVisitor
        });
        console.log('Visitor added.');

    } catch (error) {
        console.error('Error adding visitor.');
        res.status(500).json({ message: 'Error adding visitor.' });
    };
};

export const getAllVisitors = async (req, res) =>{
    try {
        const visitors = await Visitor.find();
        res.status(200).json(visitors);

    } catch(error) {
        console.error('Error retrieving all visitors.');
        res.status(500).json({ message: 'Error retrieving all visitors.' });
    };
};

export const getSingleVisitor = (req, res) =>{
    try {
        res.status(200).json(req.visitor);

    } catch(error) {
        console.error('Error retrieving the visitor.');
        res.status(500).json({ message: 'Error retrieving the visitor.' });
    };
};

export const updateVisitor = async (req, res, next) =>{
    try {
        const updatedVisitor = await Visitor.findByIdAndUpdate(
            req.params.id,
            req.validatedVisitorBody,
            {
                new: true,
                runValidators: true,
                overwrite: true
            }
        );
        
        res.status(200).json(updatedVisitor);

    } catch(error) {
        console.error('Error updating the visitor.');
        next(error);
        // res.status(500).json({ message: 'Error updating the visitor.' });
    };
};

export const deleteVisitor = async (req, res, next) =>{
    try {
        const visitorToDelete = await Visitor.findByIdAndDelete(req.params.id);
        res.status(204).send();
        console.log('Visitor deleted.');

    } catch(error) {
        console.error('Error deleting the visitor.');
        next(error);
        // res.status(500).json({ message: 'Error deleting the visitor.' });
    }
};