module.exports = (connection, DataTypes) => {
  const schema = {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'We need a first name',
        },
        notEmpty: {
          args: [true],
          msg: 'We need a first name',
        },
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'We need a last name',
        },
        notEmpty: {
          args: [true],
          msg: 'We need a last name',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'We need an email',
        },
        notEmpty: {
          args: [true],
          msg: 'We need an email',
        },
        isEmail: {
          args: [true],
          msg: 'email is not valid',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'We need a password',
        },
        notEmpty: {
          args: [true],
          msg: 'We need a password',
        },
        len: [8, 99],
      },
    },
    likes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dislikes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  };

  const UserModel = connection.define('User', schema);
  return UserModel;
};
