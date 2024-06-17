module.exports = (sequelize, DataTypes) => {
  const Preferences = sequelize.define('Preferences', {
    gender: {
      type: DataTypes.STRING,
    },
    age_min: {
      type: DataTypes.INTEGER,
    },
    age_max: {
      type: DataTypes.INTEGER,
    },
    budget_min: {
      type: DataTypes.INTEGER,
    },
    budget_max: {
      type: DataTypes.INTEGER,
    },
    veg_nonveg: {
      type: DataTypes.STRING,
    },
  });

  Preferences.associate = function(models) {
    Preferences.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Preferences;
};
