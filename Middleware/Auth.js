const jwt = require('jsonwebtoken')

const Auth = {
  verify: async (req, res, next) => {
    try {
      const token = req?.headers?.authorization?.slice(7)
      const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN)

      if (decoded) {
        req.locals = { user: decoded }
        next()
      } else {
        throw { success: false, status: 401, message: 'unauthorize' }
      }
    } catch (error) {
      let customMessage = ''
      customMessage += 'please not directy consume this message to the client, '
      customMessage += "you're try to access the endpoint that need a login, "
      customMessage += 'or you has not correctly attach the auth headers.'

      if (error.status === 401 || error.message.includes('must be provided')) {
        res.status(401).json({
          status: 401,
          message: customMessage
        })
      } else {
        res.status(500).json({
          status: 500,
          message: error.message
        })
      }
    }
  }
}

module.exports = Auth
