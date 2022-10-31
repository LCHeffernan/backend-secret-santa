const { UserEvents, Event } = require('../models');

exports.findUserEvent = async (_, res) => {
  const allUserEvent = await UserEvents.findAll({include: Event});
  res.status(200).json(allUserEvent);
};

exports.findUserEventById = async (req, res) => {
    const { id } = req.params;
    const oneUserEvent = await UserEvents.findByPk(id);
    res.status(200).json(oneUserEvent);
  };

  exports.findUserEventByUserId = async (req, res) => {
    const { id } = req.params;
    const findUserEventByUserId = await UserEvents.findAll({ where: { UserId: id }, include: Event  } );
    res.status(200).json(findUserEventByUserId);
  };

exports.createUserEvent = async (req, res) => {
    const newUserEvent = await UserEvents.create(req.body);
    res.status(201).json(newUserEvent);
  };

  exports.updateUserEventById = async (req, res) => {
    const { id } = req.params;
    const userEventUpdate = await UserEvents.update(req.body, { where: { id: id } });
    res.status(200).json(userEventUpdate);
  };

  exports.deleteUserEventById = async (req, res) => {
    const { id } = req.params;
    const userEventDeleted = await UserEvents.destroy({ where: { id: id } });
    res.status(200).json(userEventDeleted);
  };
