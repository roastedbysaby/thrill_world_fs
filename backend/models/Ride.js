export class Ride{
    constructor(id, data){
        this.id=id;
        this.name=data.name;
        this.capacity=data.capacity;
        this.minHeight=data.minHeight;
        this.duration=data.duration;
        this.status=data.status;
    };
};

export const rides = [
    new Ride(1, {
        name: 'The Goliath',
        capacity: 20,
        minHeight: 100,
        duration: 180,
        status: 'Operational'
    }),
    new Ride(2, {
        name: 'The Monster',
        capacity: 40,
        minHeight: 80,
        duration: 180,
        status: 'Operational'
    })
];