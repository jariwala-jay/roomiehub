// models/chat.js
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    "Chat",
    {
      sender_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      receiver_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "Chats",
      underscored: true,
    }
  );

  Chat.associate = (models) => {
    Chat.belongsTo(models.User, { foreignKey: "sender_id", as: "Sender" });
    Chat.belongsTo(models.User, { foreignKey: "receiver_id", as: "Receiver" });
  };

  return Chat;
};
