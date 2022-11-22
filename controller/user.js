const crudHelper = require('./helper');

exports.findUser = async (_, res) => {
  crudHelper.findAllEntries(res, "user");
};

exports.findUserById = async (req, res) => {
  crudHelper.findEntryById(req.params.id, res, "user");
};

exports.createUser = async (req, res) => {
  crudHelper.createEntries(req, res, 'user');
};

exports.updateUserById = async (req, res) => {
  crudHelper.updateDetails(req.params.id, req, res, "user");
};

exports.deleteUserById = async (req, res) => {
  crudHelper.deleteEntry(req.params.id, res, "user");
};

exports.allAccess = (_, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (_, res) => {
  res.status(200).send('User Content');
};
