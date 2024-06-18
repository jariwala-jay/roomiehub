'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Preference extends Model {
    static associate(models) {
      Preference.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Preference.init({
    userId: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    age_min: DataTypes.INTEGER,
    age_max: DataTypes.INTEGER,
    budget_min: DataTypes.INTEGER,
    budget_max: DataTypes.INTEGER,
    veg_nonveg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Preference',
  });
  return Preference;
};
