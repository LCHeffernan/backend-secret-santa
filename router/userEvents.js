const express = require("express");
const userEventController = require("../controller/userEvents");

const userEventRouter = express.Router();

userEventRouter.get("/", userEventController.findUserEvent);
userEventRouter.get("/:id", userEventController.findUserEventById);
userEventRouter.get("/userId/:id", userEventController.findUserEventByUserId);
userEventRouter.post("/", userEventController.createUserEvent);
userEventRouter.patch("/:id", userEventController.updateUserEventById);
userEventRouter.delete("/:id", userEventController.deleteUserEventById);


module.exports = userEventRouter;