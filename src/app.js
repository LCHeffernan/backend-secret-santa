const express = require("express");
const userRouter = require("../router/user");

const app = express();

//cors proxy fix
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.use(express.json());
app.use("/users", userRouter);

module.exports = app;