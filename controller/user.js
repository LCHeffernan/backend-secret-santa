const { User } = require('../models');

exports.findUser = async (_, res) => {
  try {
  const allUser = await User.findAll();
  res.status(200).json(allUser);
} catch (err) {
  res.status(500).json(err);
}
};

exports.findUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const allUser = await User.findAll({where: {id: id}});
      res.status(200).json(allUser);
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
  try {
    const findEntryById = await User.findByPk(id);
    if (!findEntryById) {
      res.status(404).json({ error: 'Entry not found.' });
    } else {
      const userUpdate = await User.update(req.body, { where: { id: id } });
      res.status(200).json(userUpdate);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try{
    const findEntryById = await User.findByPk(id);
    if(!findEntryById){
      res.status(404).json({ error: 'Entry not found.' });
    } else {
      const userDeleted = await User.destroy({ where: { id: id } });
      res.status(204).json(userDeleted);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.allAccess = (_, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (_, res) => {
  res.status(200).send('User Content');
};
