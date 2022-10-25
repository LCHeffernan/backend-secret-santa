const express = require("express");
const userController = require("../controller/user");

const userRouter = express.Router();

userRouter.get("/", userController.findUser);
userRouter.post("/", userController.createUser);


module.exports = userRouter;
