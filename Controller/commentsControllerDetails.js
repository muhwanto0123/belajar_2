/* eslint-disable no-throw-literal */
const jwt = require('jsonwebtoken')
const commentsModelsDetail = require('../Models/commentsModelsDetails')
const Joi = require('joi')

const commentsControllersDetails = {
  _getAllComments: async (req, res) => {
    try {
      const request = await commentsModelsDetail.getAllComment()

      if (request.length === 0) {
        throw { message: 'No comment found', success: false, status: 404 }
      }

      res.status(200).json({
        status: 200,
        message: 'ok',
        data: request
      })
    } catch (error) {
      if (error.status === 404) {
        res.status(404).json({
          status: error.status,
          message: error.message
        })
      } else {
        res.status(500).json({
          status: 500,
          message: 'internal application error'
        })
      }
    }
  },

  _addComment: async (req, res) => {
    try {
      const schema = Joi.object({
        recipeUid: Joi.string().uuid().required(),
        message: Joi.string().min(2).max(150).required()
      })

      const validateOptions = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
      }

      await schema.validateAsync(req.body, validateOptions)

      const { recipeUid, message } = req.body
      const { authorization } = req.headers

      await jwt.verify(
        authorization.split('Bearer ')[1],
        process.env.APP_SECRET_TOKEN
      )

      const usr = await jwt.decode(
        authorization.split('Bearer ')[1],
        process.env.APP_SECRET_TOKEN
      )

      const request = await commentsModelsDetail.addComment({
        recipeUid,
        userUid: usr.user_uid,
        message
      })

      res.status(201).json({
        status: 201,
        message: 'comment posted',
        data: request
      })
    } catch (error) {
      console.log(error)
      if (error?.detail?.includes('is not present in table')) {
        res.status(400).json({
          status: 400,
          message: 'Post comment failed due to recipe not found'
        })
      } else if (
        error.status === 422 ||
        error?.message?.includes('must be a string') ||
        error?.message?.includes('is required') ||
        error?.message?.includes('not allowed to be empty') ||
        error?.message?.includes('must be a valid GUID')
      ) {
        res.status(422).json({
          status: 422,
          message: String(error.message).replaceAll('"', "'").split('. ')
        })
      } else if (error?.status === 401 || error?.name === 'JsonWebTokenError') {
        res.status(401).json({
          status: 401,
          message: 'unautorize'
        })
      } else {
        res.status(500).json({
          status: 500,
          message: 'internal application error'
        })
      }
    }
  },

  _getCommentByUID: async (req, res) => {
    try {
      const { recipeUid } = req.params
      const request = await commentsModelsDetail.getCommentByUID(recipeUid)
      res.status(200).json({
        status: 200,
        message: 'ok',
        data: request
      })
    } catch (error) {
      res.status(404).json({
        status: false,
        message: 'failed',
        data: ['No comment found']
      })
    }
  }
}

module.exports = commentsControllersDetails
