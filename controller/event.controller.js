const { Event } = require("../models");

exports.findEvent = async (_, res) => {
    const allEvent = await Event.findAll();
    res.status(200).json(allEvent);
}

exports.findEventById = async (req, res) => {
    const { id } = req.params;
    const allEvent = await Event.findAll({ where: { id: id } });
    res.status(200).json(allEvent);
}

exports.createEvent = async (req, res) => {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
};

exports.updateEventById = async (req, res) => {
    const { id } = req.params;
    const eventUpdate = await Event.update(req.body, { where: { id: id } });
    res.status(200).json(eventUpdate);
};

exports.deleteEventById = async (req, res) => {
    const { id } = req.params;
    const eventDeleted = await Event.destroy({ where: { id: id } });
    res.status(200).json(eventDeleted);
};