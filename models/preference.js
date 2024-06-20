const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Preferences extends Model {}

  Preferences.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Any',
    },
    age_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 18,
    },
    age_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
    },
    budget_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    budget_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100000,
    },
    veg_nonveg: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Any',
    },
  }, {
    sequelize,
    modelName: 'Preferences',
  });

  return Preferences;
};
