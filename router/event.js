const express = require('express');
const eventController = require('../controller/event');

const eventRouter = express.Router();

eventRouter.get('/', eventController.findEvent);
eventRouter.get('/:id', eventController.findEventById);
eventRouter.post('/', eventController.createEvent);
eventRouter.patch('/:id', eventController.updateEventById);
eventRouter.delete('/:id', eventController.deleteEventById);

module.exports = eventRouter;
