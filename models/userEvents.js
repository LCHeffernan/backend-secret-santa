module.exports = (connection, DataTypes) => {
    const schema = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    //     // references: {
    //     //     model: "Users",
    //     //     key: "id"
    //     // }
      },
    //   userId: {
    //     type: DataTypes.INTEGER,
    //   },
    //   eventId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: "Events",
    //         key: "id"
    //     }
    //   }, 
    //   buyForId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: "Users",
    //         key: "id"
    //     }
    //   }
    };
  
    const UserEventsModel = connection.define('UserEvents', schema);
    return UserEventsModel;
  };