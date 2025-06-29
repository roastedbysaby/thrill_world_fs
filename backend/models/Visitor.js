export class Visitor{
    constructor(id, data){
        this.id=id;
        this.name=data.name;
        this.age=data.age;
        this.height=data.height;
    };
};

export const visitors = [
    new Visitor(1, {
        name: 'iba salma',
        age: 22,
        height: 180
    }),
    new Visitor(2, {
        name: 'sim fred',
        age: 32,
        height: 177
    })
];