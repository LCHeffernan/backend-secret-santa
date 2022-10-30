const express = require("express");
const { authJwt, verifySignUp } = require("../middleware");
const userController = require("../controller/user");

const userRouter = express.Router();

userRouter.get("/", userController.findUser);
userRouter.get("/:id", userController.findUserById);
userRouter.post("/", userController.createUser);
userRouter.patch("/:id", userController.updateUserById);
userRouter.delete("/:id", userController.deleteUserById);


module.exports = userRouter;