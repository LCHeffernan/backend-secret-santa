const { User } = require('../src/models');

exports.findUser = async (_, res) => {
  const allUser = await User.findAll();
  res.status(200).json(allUser);
};

exports.findUserById = async (req, res) => {
  const { id } = req.params;
  const allUser = await User.findAll({ where: { id: id } });
  res.status(200).json(allUser);
};

exports.createUser = async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
};

exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  const userUpdate = await User.update(req.body, { where: { id: id } });
  res.status(200).json(userUpdate);
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  const userDeleted = await User.destroy({ where: { id: id } });
  res.status(200).json(userDeleted);
};
