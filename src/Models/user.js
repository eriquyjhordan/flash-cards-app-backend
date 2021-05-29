const bcrypt = require('bcrypt');

const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    hashedPassword: DataTypes.STRING,
  });

  User.addHook('beforeSave', async (user) => {
    if (user.password) {
      // eslint-disable-next-line no-param-reassign
      user.hashedPassword = await bcrypt.hash(user.password, 8);
    }
  });

  return User;
};

module.exports = UserModel;
