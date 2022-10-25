const Sequelize = require("sequelize");
const UserModel = require("./user");

const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env;

const setUpDatabase = () => {
  const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    logging: false,
  });

  const User = UserModel(connection, Sequelize);

  connection.sync({ alter: true });

  return {
    User
  };
};

module.exports = setUpDatabase();