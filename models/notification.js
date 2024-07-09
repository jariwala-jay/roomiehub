module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: false,
    },
    sender_id: {  
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'Notifications',
    underscored: true,
  });

  Notifications.associate = (models) => {
    Notifications.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    Notifications.belongsTo(models.User, { as: 'sender', foreignKey: 'sender_id' });
  };

  return Notifications;
};
