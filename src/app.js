const express = require("express");
const cors = require("cors");
const userRouter = require("../router/user");

const app = express();

//cors proxy fix
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.use(cors({ credentials: true, origin: true }));
app.options("*", cors());

app.use(express.json());
app.use("/users", userRouter);

module.exports = app;