const Sequelize = require('sequelize');
const UserModel = require('./user');
const EventModel = require('./event');
const UserEventsModel = require('./userEvents');

const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env;

const setUpDatabase = () => {
  const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: false,
  });

  const User = UserModel(connection, Sequelize);
  const Event = EventModel(connection, Sequelize);
  const UserEvents = UserEventsModel(connection, Sequelize);

  User.hasMany(UserEvents);
  UserEvents.belongsTo(User);
  UserEvents.belongsTo(User, { as: 'BuyFor' });
  Event.hasMany(UserEvents, {onDelete: 'CASCADE'});
  UserEvents.belongsTo(Event);

  Event.belongsTo(User, { as: 'Admin' });
  User.hasMany(Event);

  connection.sync({ alter: true });

  return {
    User,
    Event,
    UserEvents,
  };
};

module.exports = setUpDatabase();
