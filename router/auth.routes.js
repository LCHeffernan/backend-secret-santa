const express = require('express');
const { verifySignUp } = require('../middleware');
const controller = require('../controller/auth.controller');
const authRouter = express.Router();

// authRouter.use(function (req, res, next) {
//     res.header(
//         "Access-Control-Allow-Headers",
//         "x-access-token, Origin, Content-Type, Accept"
//     )
//     next();
// })

//routes full route is http:localhost:3000/api/auth/signup or signin.
//signup checks whether there is already a duplicate email stored on the database + send the err message if there is, otherwise it will follow the signup POST in auth.controller
authRouter.post(
  '/signup',
  [verifySignUp.checkDuplicateEmail],
  controller.signup
);

//signin posts to the /signin route and follows the signin function in auth.controller where everything is checked and verified
authRouter.post('/signin', controller.signin);

module.exports = authRouter;
