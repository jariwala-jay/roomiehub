"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Preferences", "preferred_date", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Preferences", "preferred_date", {
      type: Sequelize.DATEONLY,  // Change it back to the previous type if needed
      allowNull: false,
    });
  },
};
