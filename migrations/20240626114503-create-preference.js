// migrations/YYYYMMDDHHMMSS-create-preferences.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Preferences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      preferred_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      preferred_veg_nonveg: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      preference_checklist: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      have_room: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Preferences');
  },
};

