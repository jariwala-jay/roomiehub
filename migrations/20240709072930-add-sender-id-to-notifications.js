'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Notifications', 'sender_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Allow NULL values temporarily
      references: {
        model: 'Users', // name of the target table
        key: 'id', // key in the target table that we're referencing
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Notifications', 'sender_id');
  },
};
