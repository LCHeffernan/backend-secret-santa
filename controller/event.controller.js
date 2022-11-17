const { Event, User } = require('../models');

exports.findEvent = async (_, res) => {
  try {
    const allEvent = await Event.findAll();
    res.status(200).json(allEvent);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const allEvent = await Event.findAll({
      where: { id: id },
      include: { model: User, as: 'Admin' },
    });
      res.status(200).json(allEvent);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createEvent = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const findEntryByPk = await Event.findByPk(id);
    if (!findEntryByPk) {
      res.status(404).json({ error: 'Entry not found.' });
    } else {
      const eventUpdate = await Event.update(req.body, { where: { id: id } });
      res.status(200).json(eventUpdate);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const findEventById = await Event.findByPk(id);
    if (!findEventById) {
      res.status(404).json({ error: 'Entry not found.' });
    } else {
      const eventDeleted = await Event.destroy({ where: { id: id } });
      res.status(204).json(eventDeleted);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
