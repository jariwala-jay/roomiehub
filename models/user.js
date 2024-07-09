// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contact_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    university: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_pic: {
      type: DataTypes.BLOB('long'), 
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    budget: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    veg_nonveg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    drinker: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    smoker: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    have_room: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'Users',
    underscored: true,
  });

  User.associate = (models) => {
    User.hasOne(models.Preferences, { foreignKey: 'user_id' });
  };
  User.associate = (models) => {
    User.hasMany(models.Requests, { as: 'sentRequests', foreignKey: 'sender_id' });
    User.hasMany(models.Requests, { as: 'receivedRequests', foreignKey: 'receiver_id' });
    User.hasMany(models.Notifications, { as: 'sentNotifications', foreignKey: 'user_id' });
  };
  return User;
};
