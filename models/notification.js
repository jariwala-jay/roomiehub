// models/notifications.js
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
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'Notifications',
    underscored: true,
  });

  Notifications.associate = (models) => {
    Notifications.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Notifications;
};
