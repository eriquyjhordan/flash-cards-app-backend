const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('Word', {
    name: DataTypes.STRING,
  });
  return User;
};

module.exports = UserModel;
