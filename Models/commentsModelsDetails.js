const database = require('../Utils/database')

const commentsModelsDetails = {
  getAllComment: async () => {
    const request = await database`SELECT * FROM comments`
    return request
  },
  addComment: async (payload) => {
    const { recipeUid, userUid, message } = payload

    const insertValue = [
      {
        user_uid: userUid,
        recipe_uid: recipeUid,
        message,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    const request = await database`INSERT INTO comments ${database(
      insertValue
    )} returning id`
    return request
  },
  getCommentByUID: async (recipeUid) => {
    const request = await database`select
    CONCAT(u.first_name,' ',u.last_name) as name,
    message, photo_profile as photo
    from "comments" c  left join users u
    on c.user_uid = u.user_uid
    where recipe_uid = ${recipeUid}`
    return request
  }
}

module.exports = commentsModelsDetails
