const { User } = require("../src/models");

exports.findUser = async (_, res) => {
    const allUser = await User.findAll();
    res.status(200).json(allUser);
};

exports.createUser = async (req, res) => {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
};