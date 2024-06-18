module.exports = (sequelize, DataTypes) => {
  const Preferences = sequelize.define('Preferences', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    age_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    budget_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    budget_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    veg_nonveg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  Preferences.associate = function(models) {
    Preferences.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Preferences;
};
