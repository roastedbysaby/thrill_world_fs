Express.js REST API - Amusement Park System

Entities
- Visitors
- Employees
- Rides
- Tickets
- Maintenances

1. Run
	npm install

2. Start server
	node index.js

Server will run at : http://localhost:3000

Notes
- All data is stored in-memory
- Data will transition to a database in the future
- Frontend will be added later
- Dates must be format YYYY-MM-DD

A postman collection is included
To use :
1. Open postman
2. Import the .json file

Each entity supports full CRUD operations

Visitors
- POST /api/visitors
- GET /api/visitors
- GET /api/visitors/:id
- PUT /api/visitors/:id
- DELETE /api/visitors/:id

Employees
- POST /api/employees
- GET /api/employees
- GET /api/employees/:id
- PUT /api/employees/:id
- DELETE /api/employees/:id

Rides
- POST /api/rides
- GET /api/rides
- GET /api/rides/:id
- PUT /api/rides/:id
- DELETE /api/rides/:id

Tickets
- POST /api/tickets
- GET /api/tickets
- GET /api/tickets/:id
- PUT /api/tickets/:id
- DELETE /api/tickets/:id

Maintenances
- POST /api/maintenances
- GET /api/maintenances
- GET/api/maintenances/:id
- PUT /api/maintenances/:id
- DELETE /api/maintenances/:id

