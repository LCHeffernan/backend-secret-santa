module.exports = (connection, DataTypes) => {
    const schema = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
    };
  
    const UserEventsModel = connection.define('UserEvents', schema);
    return UserEventsModel;
  };