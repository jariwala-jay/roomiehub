"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Chats", "is_read", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Chats", "is_read");
  },
};
