module.exports = (connection, DataTypes) => {
    const schema = {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: [true],
            msg: "We need a name",
          },
          notEmpty: {
            args: [true],
            msg: "We need a name",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: [true],
            msg: "We need an email",
          },
          notEmpty: {
            args: [true],
            msg: "We need an email",
          },
          isEmail: {
            args: [true],
            msg: "email is not valid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: [true],
            msg: "We need a password",
          },
          notEmpty: {
            args: [true],
            msg: "We need a password",
          },
          len: [8, 99],
        },
      },
    };
  
    const UserModel = connection.define("User", schema);
    return UserModel;
  };