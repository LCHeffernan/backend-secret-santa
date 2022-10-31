const config = require("../config/auth.config");
const { User } = require("../models");

var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs");

//signup encrypting the password and putting it in the database
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
//signin finding where the email address is on the database
exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            //if email doesn't exist
            if (!user) {
                return res.status(404).send({ message: "Email address and passwords do not match" })
            }
            //if the email and therefore user has been found to exist it encrypts the req.body.password and checks that the ENCRYPTED pwd matches the stored ENCRYPTED pwd
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            // if the passwords do not match, it isn't authorised and an error will be shown
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Email address and passwords do not match",
                });
            }
            // if the pwds do match, you'll get a log in token and the last section of that token will use the secret key that we have stored in auth.config WE NEED TO CHANGE THIS AND PUT AS GIT IGNORE LATER ON
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400
            });

            // then the frontend will receive the following info which is stored in localStorage (if you type that into your console you'll see all those details)
            res.status(200).send({
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                accessToken: token,
                message: `Welcome ${user.first_name}! Merry Christmas! Ho ho ho!`
            });

        })
        .catch(err => {
            res.status(500).send({ message: err.message }, console.log(err))
        })
}