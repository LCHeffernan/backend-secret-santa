const express = require("express");
const userEventController = require("../controller/userEvents");

const userEventRouter = express.Router();

userEventRouter.get("/", userEventController.findUserEvent);
userEventRouter.get("/:id", userEventController.findUserEventById);
userEventRouter.get("/userId/:id", userEventController.findUserEventByUserId);
userEventRouter.get("/eventId/:id", userEventController.findUserEventByEventId);
userEventRouter.get("/eventid/:eventId/userid/:userId", userEventController.findUserEventByUserAndEventId);
userEventRouter.post("/", userEventController.createUserEvent);
userEventRouter.patch("/:id", userEventController.updateUserEventById);
userEventRouter.patch("/eventid/:eventId/userid/:userId", userEventController.updateBuyForId);
userEventRouter.delete("/:id", userEventController.deleteUserEventById);


module.exports = userEventRouter;