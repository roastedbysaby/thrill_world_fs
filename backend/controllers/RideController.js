import { Ride, rides } from '../models/Ride.js';

export const createRide = async (req, res) =>{
    try{
        const newId = rides.length > 0 ? Math.max(...rides.map(r => r.id)) + 1 : 1;
        const newRide = new Ride (newId, req.validatedRideBody);

        rides.push(newRide);
        res.status(201).json({ message: `Ride ${newRide.name} added.` });
    } catch (error) {
        console.error('Error creating ride.');
        res.status(500).json({ error: 'Couldnt add ride.' });
    };
};

export const getAllRides = (req, res) =>{
    try {
        res.status(200).json(rides);
    } catch(error) {
        console.error('Error fetching rides.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};

export const getSingleRide = async (req, res) =>{
    try {
        res.status(200).json(req.ride);
    } catch(error) {
        console.error('Error fetching the ride.');
        res.status(500).json({ message: 'Error occurred.' });
    }; 
};

export const updateRide = async (req, res) =>{
    try {
        const rideIndex = rides.findIndex(r => r.id === req.ride.id);

        rides[rideIndex] = new Ride(req.ride.id, req.validatedRideBody);
        res.status(200).json(rides[rideIndex]);

    } catch(error) {
        console.error('Error updating ride.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};

export const deleteRide = async (req, res) =>{
    try {
        const rideIndex = rides.findIndex(r => r.id === req.ride.id);
        
        rides.splice(rideIndex, 1);
        res.status(204).send();
        console.log('Ride deleted.');
    } catch(error) {
        console.error('Error deleting ride.');
        res.status(500).json({ message: 'Error occurred.' });
    };
};