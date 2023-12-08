'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.TEXT
      },
      video_url: {
        type: Sequelize.TEXT
      },
      recipes_uid: {
        type: Sequelize.UUID,
        unique: true
      },
      ispopular: {
        type: Sequelize.BOOLEAN
      },
      ingredients: {
        type: Sequelize.JSONB
      },
      sort_desc: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('recipes')
  }
}
