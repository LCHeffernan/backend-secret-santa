const { User } = require('../models');

exports.findUser = async (_, res) => {
  const allUser = await User.findAll();
  res.status(200).json(allUser);
};

exports.findUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const allUser = await User.findByPk(id);
    if (!allUser) {
      res.status(404).json({ error: 'Entry not found.' });
    } else {
      res.status(200).json(allUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
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

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
  res.status(200).send('User Content');
};
