import express from 'express';

import clients from './src/controllers/clients.js';
import courses from './src/controllers/courses.js';

const routes = express.Router();

routes.get('/clients', clients.findAll);
routes.get('/clients/:id', clients.findClient);
routes.put('/clients/:id', clients.updateClient);
routes.delete('/clients/:id', clients.deleteClient);
routes.post('/clients', clients.addClient);

//courses

routes.post('/courses', courses.addCourse);
routes.get('/courses', courses.getCourses);

export { routes as default };
