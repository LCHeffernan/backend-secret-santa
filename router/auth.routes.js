const express = require("express");
const { verifySignUp } = require("../middleware");
const controller = require("../controller/auth.controller");
const authRouter = express.Router();

// app.use(function (req, req, next) {
//     res.header(
//         "Access-Control-Allow-Headers",
//         "x-access-token, Origin, Content-Type, Accept"
//     )
//     next();
// })

authRouter.post(
    "/signup",
    [verifySignUp.checkDuplicateEmail],
    controller.signup)

authRouter.post("/signin", controller.signin)

module.exports = authRouter;
