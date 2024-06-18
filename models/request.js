module.exports = (sequelize, DataTypes) => {
  const { Model } = require('sequelize'); // Import Model from Sequelize

  class Request extends Model {
    static associate(models) {
      Request.belongsTo(models.User, { as: 'sender', foreignKey: 'senderId' });
      Request.belongsTo(models.User, { as: 'receiver', foreignKey: 'receiverId' });
    }
  }

  Request.init({
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
      defaultValue: 'pending',
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Request',
  });

  return Request;
};
