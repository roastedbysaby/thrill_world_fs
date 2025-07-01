import { Ride } from '../models/Ride.js';

export const createRide = async (req, res) =>{
    try{
        const newRide = await Ride.create(req.validatedRideBody);

        res.status(201).json({
            message: `Ride ${newRide.name} added.`,
            ride: newRide
        });
        console.log('Ride added.');
    } catch(error) {
        console.error('Error adding ride.');
        res.status(500).json({ error: 'Couldnt add ride.' });
    };
};

export const getAllRides = async (req, res) =>{
    try {
        const rides = await Ride.find();
        res.status(200).json(rides);
    } catch(error) {
        console.error('Error retrieving all rides.');
        res.status(500).json({ message: 'Error retrieving all rides.' });
    };
};

export const getSingleRide = (req, res) =>{
    try {
        res.status(200).json(req.ride);
    } catch(error) {
        console.error('Error retrieving the ride.');
        res.status(500).json({ message: 'Error retrieving the ride.' });
    }; 
};

export const updateRide = async (req, res, next) =>{
    try {
        const updatedRide = await Ride.findByIdAndUpdate(
            req.params.id,
            req.validatedRideBody,
            { 
                new: true,
                runValidators: true,
                overwrite: true
            }
        );

        console.log('Ride updated.');
        res.status(200).json(updatedRide);
    } catch(error) {
        console.error('Error updating ride.');
        next(error);
        // res.status(500).json({ message: 'Error occurred.' });
    };
};

export const deleteRide = async (req, res, next) =>{
    try {
        const rideToDelete = await Ride.findByIdAndDelete(req.params.id);
        res.status(204).send();
        console.log('Ride deleted.');
    } catch(error) {
        console.error('Error deleting ride.');
        next(error);
        // res.status(500).json({ message: 'Error occurred.' });
    };
};