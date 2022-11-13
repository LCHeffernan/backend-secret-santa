const { UserEvents, Event, User } = require('../models');

exports.findUserEvent = async (_, res) => {
  try {
    const allUserEvent = await UserEvents.findAll({ include: Event });
    res.status(200).json(allUserEvent);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findUserEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const oneUserEvent = await UserEvents.findByPk(id);
    if (!oneUserEvent) {
      res.status(404).json({ error: 'Entry not found.' });
    } else {
      res.status(200).json(oneUserEvent);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findUserEventByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const findUserEventByUserId = await UserEvents.findAll({
      where: { UserId: id },
      include: [User, Event, { model: User, as: 'BuyFor' }],
    });
    if (!findUserEventByUserId) {
      res.status(404).json({ error: 'Entry no found' });
    } else {
      res.status(200).json(findUserEventByUserId);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findUserEventByEventId = async (req, res) => {
  const { id } = req.params;
  try {
    const findUserEventByEventId = await UserEvents.findAll({
      where: { EventId: id },
      include: [User, Event],
    });
    if (!findUserEventByEventId) {
      res.status(404).json({ error: 'Entry not found' });
    } else {
      res.status(200).json(findUserEventByEventId);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findUserEventByUserAndEventId = async (req, res) => {
  const { eventId, userId } = req.params;
  try {
    const findUserEventByUserAndEventId = await UserEvents.findAll({
      where: { UserId: userId, EventId: eventId },
    });
    if (!findUserEventByUserAndEventId) {
      res.status(404).json({ error: 'Entry not found.' });
    } else {
      res.status(200).json(findUserEventByUserAndEventId);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createUserEvent = async (req, res) => {
  try {
    const newUserEvent = await UserEvents.create(req.body);
    res.status(201).json(newUserEvent);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateUserEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const findUserEventByPk = await UserEvents.findByPk(id);
    if (!findUserEventByPk) {
      res.status(404).json({ error: 'Entry not found.' });
    } else {
      const userEventUpdate = await UserEvents.update(req.body, {
        where: { UserId: id },
      });
      res.status(200).json(userEventUpdate);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateBuyForId = async (req, res) => {
  const { eventId, userId } = req.params;
  try {
    const findUserEventByUserAndEventId = await UserEvents.findAll({
      where: { UserId: userId, EventId: eventId },
    });
    if (!findUserEventByUserAndEventId) {
      res.status(404).json({ error: 'Entry not found.' });
    } else {
      console.log(eventId, userId);
      const userUpdateBuyFor = await UserEvents.update(req.body, {
        where: { UserId: userId, EventId: eventId },
      });
      res.status(200).json(userUpdateBuyFor);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteUserEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const findUserEventByPk = await UserEvents.findByPk(id);
    if (!findUserEventByPk) {
      res.status(404).json({ error: 'Entry not found.' });
    } else {
      const userEventDeleted = await UserEvents.destroy({ where: { id: id } });
      res.status(200).json(userEventDeleted);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
