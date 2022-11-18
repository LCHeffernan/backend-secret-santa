module.exports = (connection, DataTypes) => {
  const schema = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'We need an id',
        },
      },
    },
  };

  const UserEventsModel = connection.define('UserEvents', schema);
  return UserEventsModel;
};
