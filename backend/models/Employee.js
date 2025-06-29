export class Employee{
    constructor(id, data){
        this.id=id;
        this.name=data.name;
        this.position=data.position;
        this.department=data.department;
    };
};

export const employees = [
    new Employee(1, {
        name: 'salma iba',
        position: 'Owner',
        department: 'Direction'
    }),
    new Employee(2, {
        name: 'sopolak sim',
        position: 'Technician',
        department: 'IT'
    })
];