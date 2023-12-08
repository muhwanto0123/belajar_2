/* eslint-disable prettier/prettier */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // -- adding foreign key comments(recipe_uid) --> recipes(recipes_uid)
    await queryInterface.sequelize.query(`ALTER TABLE "comments" 
    ADD CONSTRAINT "fk_comments_recipes" 
    FOREIGN KEY ("recipe_uid") 
    REFERENCES "public"."recipes"("recipes_uid") 
    ON DELETE CASCADE ON UPDATE CASCADE;`)

    // -- adding foreign key comments(user_uid) --> users(user_uid)
    await queryInterface.sequelize.query(`ALTER TABLE "comments" 
    ADD CONSTRAINT "fk_comments_users" 
    FOREIGN KEY ("user_uid") 
    REFERENCES "public"."users"("user_uid") 
    ON DELETE CASCADE ON UPDATE CASCADE;`)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
