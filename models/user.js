'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Preference, { foreignKey: 'userId', as: 'preferences' });
      User.hasMany(models.Request, { foreignKey: 'senderId', as: 'sentRequests' });
      User.hasMany(models.Request, { foreignKey: 'receiverId', as: 'receivedRequests' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    contact_info: DataTypes.STRING,
    email: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    university: DataTypes.STRING,
    budget: DataTypes.INTEGER,
    veg_nonveg: DataTypes.STRING,
    other_requirements: DataTypes.TEXT,
    hashed_password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
