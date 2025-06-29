export class Ticket{
    constructor(id, visitorId, data){
        this.id=id;
        this.visitorId=visitorId;
        this.type=data.type;
        this.price=data.price;
        this.purchaseDate=data.purchaseDate;
        this.validUntil=data.validUntil;
    };
};

export const tickets = [
    new Ticket(1, 1, {
        type: 'vip',
        price: 199.99,
        purchaseDate: new Date('2025-06-16'),
        validUntil: new Date('2026-06-16')
    }),
    new Ticket(2, 2, {
        type: 'season',
        price: 149.99,
        purchaseDate: new Date('2025-06-17'),
        validUntil: new Date('2026-06-17')
    })
];