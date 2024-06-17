'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Preference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Preference.init({
    user_id: DataTypes.INTEGER,
    preferred_country: DataTypes.STRING,
    preferred_state: DataTypes.STRING,
    preferred_city: DataTypes.STRING,
    preferred_university: DataTypes.STRING,
    preferred_gender: DataTypes.STRING,
    preferred_budget: DataTypes.INTEGER,
    preferred_veg_nonveg: DataTypes.STRING,
    preferred_other_requirements: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Preference',
  });
  return Preference;
};