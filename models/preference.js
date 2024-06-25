module.exports = (sequelize, DataTypes) => {
  const Preferences = sequelize.define(
    "Preferences",
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      preferred_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      preferred_veg_nonveg: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      preference_checklist: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      have_room: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Preferences",
      underscored: true,
    }
  );

  Preferences.associate = (models) => {
    Preferences.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return Preferences;
};
