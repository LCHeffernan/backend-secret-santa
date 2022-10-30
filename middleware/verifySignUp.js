const { User } = require("../models");

const checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).json({
                message: "Failed! Email is already in use!"
            });
            return;
        }
        next();
    });
};

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail
}

module.exports = verifySignUp;
