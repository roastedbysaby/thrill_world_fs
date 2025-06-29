export class Maintenance{
    constructor(id, rideId, employeeId, data){
        this.id=id;
        this.rideId=rideId;
        this.employeeId=employeeId;
        this.date=data.date;
        this.description=data.description;
        this.status=data.status;
    };
};

export const maintenances = [
    new Maintenance(1, 1, 1, {
        date: new Date('2025-06-19'),
        description: 'Cleaning the goliath',
        status: 'Completed.'
    }),
    new Maintenance(2, 2, 2, {
        date: new Date('2025-06-20'),
        description: 'Cleaning the Monster.',
        status: 'In progress.'
    })
];