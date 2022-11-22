const { UserEvents, Event, User } = require('../models');
const crudHelper = require('./helper');

exports.findUserEvent = async (_, res) => {
  crudHelper.findAllEntries(res, "userevents");
};

// exports.findUserEventById = async (req, res) => {
  // crudHelper.findEntryById(req.params.id, res, "userevents");
  // const { id } = req.params;
  // try {
  //   const oneUserEvent = await UserEvents.findByPk(id);
  //   if (!oneUserEvent) {
  //     res.status(404).json({ error: 'The userevents could not be found.' });
  //   } else {
  //     res.status(200).json(oneUserEvent);
  //   }
  // } catch (err) {
  //   res.status(500).json(err);
  // }
// };

exports.findUserEventByUserId = async (req, res) => {
  //  crudHelper.findEntryById(req.params.id, res, "userevents");
  const { id } = req.params;
  try {
    const findUserEventByUserId = await UserEvents.findAll({
      where: { UserId: id },
      include: [User, Event, { model: User, as: 'BuyFor' }],
    });
    res.status(200).json(findUserEventByUserId);
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
    res.status(200).json(findUserEventByEventId);
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
    res.status(200).json(findUserEventByUserAndEventId);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createUserEvent = async (req, res) => {
  crudHelper.createEntries(req, res, 'userevents');
};

exports.updateUserEventById = async (req, res) => {
  crudHelper.updateDetails(req.params.id, req, res, "userevents");
};

exports.updateBuyForId = async (req, res) => {
  // crudHelper.updateDetails(req.params.id, req, res, "userevents");
  const { eventId, userId } = req.params;
  try {
    const userUpdateBuyFor = await UserEvents.update(req.body, {
      where: { UserId: userId, EventId: eventId },
    });
    res.status(200).json(userUpdateBuyFor);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteUserEventById = async (req, res) => {
  crudHelper.deleteEntry(req.params.id, res, "userevents");
};
