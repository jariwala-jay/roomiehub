// models/requests.js
module.exports = (sequelize, DataTypes) => {
  const Requests = sequelize.define('Requests', {
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
  }, {
    tableName: 'Requests',
    underscored: true,
  });

  Requests.associate = (models) => {
    Requests.belongsTo(models.User, { as: 'sender', foreignKey: 'sender_id' });
    Requests.belongsTo(models.User, { as: 'receiver', foreignKey: 'receiver_id' });
  };

  return Requests;
};
