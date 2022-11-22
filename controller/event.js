const crudHelper = require('./helper');

exports.findEvent = async (_, res) => {
  crudHelper.findAllEntries(res, "event");
};

exports.findEventById = async (req, res) => {
  crudHelper.findEntryById(req.params.id, res, "event");
};

exports.createEvent = async (req, res) => {
  crudHelper.createEntries(req, res, 'event');
};

exports.updateEventById = async (req, res) => {
  crudHelper.updateDetails(req.params.id, req, res, "event");
};

exports.deleteEventById = async (req, res) => {
  crudHelper.deleteEntry(req.params.id, res, "event");
};
