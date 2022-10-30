const config = require("../config/auth.config");
const { User } = require("../models");

var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    }).then(res.send({ message: "User was registered successfully!" })
    )
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "Email address and passwords do not match" })
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Email address and passwords do not match",
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400
            });
            res.status(200).send({
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                accessToken: token
            });

        })
        .catch(err => {
            res.status(500).send({ message: err.message }, console.log(err))
        })
}