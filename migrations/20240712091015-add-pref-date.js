'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'preferred_move_in_date', {
      type: Sequelize.DATEONLY,
      allowNull: true, // Change this to false if the field is required
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'preferred_move_in_date');
  }
};
