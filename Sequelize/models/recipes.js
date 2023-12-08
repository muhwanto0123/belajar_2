'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class recipes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  recipes.init(
    {
      title: DataTypes.TEXT,
      status: DataTypes.TEXT,
      image: DataTypes.TEXT,
      video_url: DataTypes.TEXT,
      recipes_uid: DataTypes.UUID,
      ispopular: DataTypes.BOOLEAN,
      ingredients: DataTypes.JSONB,
      sort_desc: DataTypes.TEXT,
      category: DataTypes.JSONB,
      rating: DataTypes.FLOAT,
      created_by: DataTypes.UUID
    },
    {
      sequelize,
      modelName: 'recipes'
    }
  )
  return recipes
}
