'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    static associate(models) {
      Request.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' });
      Request.belongsTo(models.User, { foreignKey: 'receiverId', as: 'receiver' });
    }
  }
  Request.init({
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};
