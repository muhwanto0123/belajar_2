const recipeModelHome = require('../Models/recipeHomeModel')

const recipeHomeController = {
  getPopulareRecipe_Controller: async (req, res) => {
    try {
      const request = await recipeModelHome.getPopularRecipe()
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
          status: 404,
          message: error.message
        })
      }
      // console.log(error)
      res.status(500).json({
        status: 500,
        message: error.message
      })
    }
  },
  getListRecipe_Controller: async (req, res) => {
    try {
      const request = await recipeModelHome.getListRecipe()
      // console.log(request)
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
      // console.log(error)
      if (error.type === 'nodata') {
        res.status(404).json({
          status: 404,
          message: error.message
        })
      }
      res.status(500).json({
        status: 500,
        message: error.message
      })
    }
  },
  getNewRecipe_Controller: async (req, res) => {
    try {
      // console.log('ok')
      const request = await recipeModelHome._getNewRecipe()
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
          status: 404,
          message: error.message
        })
      }
      res.status(500).json({
        status: 500,
        message: error.message
      })
    }
  }
}

module.exports = recipeHomeController
