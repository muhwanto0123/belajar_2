const receipesModelsDetails = require('../Models/receipesModelDetails')
const { users } = require('../Sequelize/models')

const receipesControllerDetails = {

  _getAllReceipes: async (req, res) => {
    try {
      const request = await receipesModelsDetails.getAllReceipes() // merequest get all receipes dari model
      res.status(200).json({
        status: true,
        massage: 'get data succes',
        data: request
      })
    } catch (error) {
      res.status(502).json({
        status: false,
        massage: 'Somethin Wrong in Server'
      })
    }
  },

  _getRecipesByParams: async (req, res) => {
    try {
      const { receiptUid } = req.params
      const requestRecipe =
        await receipesModelsDetails.getRecipesByParams(receiptUid)
      const requestUser = await users.findOne({
        attributes: ['first_name', 'last_name'],
        where: { user_uid: requestRecipe[0].created_by }
      })
      const data = [{ ...requestRecipe[0], ...requestUser.dataValues }]
      res.status(200).json({
        status: 200,
        message: 'ok',
        data
      })
    } catch (error) {
      res.status(502).json({
        status: false,
        massage: 'Somethin Wrong in Server'
      })
    }
  },

  _getRecipesByTitle: async (req, res) => {
    try {
      const { title } = req.body

      const request = await receipesModelsDetails.getRecipesByTitle(title)
      if (request.length === 0) {
        // eslint-disable-next-line no-throw-literal
        throw { type: 'nodata', message: 'data not found' }
      }
      res.status(200).json({
        status: 200,
        message: 'ok',
        data: request
      })
    } catch (error) {
      if (error.type === 'nodata') {
        res.status(404).json({
          status: false,
          massage: 'data not found'
        })
        return
      }
      res.status(500).json({
        status: false,
        massage: error
      })
    }
  }
}
module.exports = receipesControllerDetails
