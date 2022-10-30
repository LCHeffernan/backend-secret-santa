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

  // User.belongsToMany(Event, { foreighKey: 'userId', as: 'userId', through: { model: 'UserEvents', unique: false}});
  // User.belongsToMany(Event, { foreignKey: 'buyForId', as: 'buyForId', through: { model: 'UserEvents', unique: false }});
  // Event.belongsToMany(User, { through: 'UserEvents' });

  User.hasMany(UserEvents);
  UserEvents.belongsTo(User);
  User.hasMany(UserEvents);
  UserEvents.belongsTo(User, { as: "BuyForId" });
  Event.hasMany(UserEvents);
  UserEvents.belongsTo(Event);

  connection.sync({ alter: true });

  return {
    User,
    Event,
  };
};

module.exports = setUpDatabase();
