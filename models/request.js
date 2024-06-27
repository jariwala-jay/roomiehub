// models/requests.js
module.exports = (sequelize, DataTypes) => {
  const Requests = sequelize.define('Requests', {
    sender_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: false,
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

  return Requests;
};
