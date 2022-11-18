const express = require('express');
const cors = require('cors');
const userRouter = require('./router/user');
const authRouter = require('./router/auth');
const eventRouter = require('./router/event');
const userEventRouter = require('./router/userEvents');

const app = express();
require('./router/auth');
require('./router/user');

//cors proxy fix
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(cors({ credentials: true, origin: true }));
app.options('*', cors());

app.use(express.json());

//parse requests of content-type - application
app.use(express.urlencoded({ extended: true }));

//simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Secret Santa App' });
});

app.use('/users', userRouter);
app.use('/events', eventRouter);
app.use('/userevents', userEventRouter);
app.use('/api/auth/', authRouter);

const PORT = 3000;

const APP_PORT = PORT || 4000;

app.listen(APP_PORT, () => {
  console.log(`App is listening on port ${APP_PORT}`);
});

module.exports = app;
