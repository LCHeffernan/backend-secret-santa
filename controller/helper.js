const { User, Event, UserEvents } = require('../models');

const getModel = (model) => {
    if (model === 'user') {
      return User;
    }
    if (model === 'event') {
      return Event;
    }
    if (model === 'userevents') {
      return UserEvents;
    }
  };
  
  const getIncludes = (model) => {
    if (model === 'event') return { include: { model: User, as: 'Admin' } };
  
    if (model === 'userevents') return { include: [User, Event, { model: User, as: 'BuyFor' }]};
    
    return {};
  };

const get404Error = (model) => ({ error: `The ${model} could not be found.` });

exports.createEntries = async (req, res, model) => {
  const Model = getModel(model);
  try {
    const createEntryInDb = await Model.create(req.body);
    res.status(201).json(createEntryInDb);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findAllEntries = async (res, model) => {
  const Model = getModel(model);
  const includeModel = getIncludes(model);
  const findAllEntriesInDb = await Model.findAll({ ...includeModel });
  res.status(200).json(findAllEntriesInDb);
};

exports.findEntryById = async (id, res, model) => {
  const Model = getModel(model);
  const includeModel = getIncludes(model);
  try {
    const findEntryByIdInDb = await Model.findAll({where: {id: id},
      ...includeModel,
    });
    if (!findEntryByIdInDb) {
      res.status(404).json(get404Error(model));
    } else {
      res.status(200).json(findEntryByIdInDb);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateDetails = async (id, req, res, model) => {
  const Model = getModel(model);
  try {
    const findEntryById = await Model.findByPk(id);
    if (!findEntryById) {
      res.status(404).json(get404Error(model));
    } else {
      await Model.update(req.body, {
        where: { id: id },
      });

      const findUpdatedEntryById = await Model.findByPk(id);
      res.status(200).json(findUpdatedEntryById);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.deleteEntry = async (id, res, model) => {
    // console.log(id);
  const Model = getModel(model);
  try {
    const findEntryByIdInDb = await Model.findByPk(id);
    if (!findEntryByIdInDb) {
      res.status(404).json(get404Error(model));
    } else {
      const deleteEntryInDb = await Model.destroy({
        where: { id: id },
      });

      res.status(204).json(deleteEntryInDb);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};