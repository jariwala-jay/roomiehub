'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Preferences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      preferred_country: {
        type: Sequelize.STRING
      },
      preferred_state: {
        type: Sequelize.STRING
      },
      preferred_city: {
        type: Sequelize.STRING
      },
      preferred_university: {
        type: Sequelize.STRING
      },
      preferred_gender: {
        type: Sequelize.STRING
      },
      preferred_budget: {
        type: Sequelize.INTEGER
      },
      preferred_veg_nonveg: {
        type: Sequelize.STRING
      },
      preferred_other_requirements: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Preferences');
  }
};