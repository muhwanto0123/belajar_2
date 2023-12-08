const database = require('../Utils/database')

const bcrypt = require('bcrypt')

const userModels = {
  modelCheckEmail: async (email) => {
    const request = await database`SELECT * FROM users WHERE email = ${email}`
    return request
  },
  modelUserRegister: async (payload) => {
    const {
      firstName,
      lastName,
      role,
      email,
      userUuid,
      password,
      photoProfile
    } = payload
    const saltRounds = 3
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    const insertValue = [
      {
        first_name: firstName,
        last_name: lastName,
        role,
        user_uid: userUuid,
        email,
        photo_profile: photoProfile,
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    const request = await database`INSERT INTO users ${database(
      insertValue
    )} returning user_uid;`
    return request
  },
  modelDetailUser: async (decoded) => {
    const request =
      await database` SELECT first_name,last_name,phone_number,email,photo_profile FROM users WHERE user_uid = ${decoded.user_uid}`
    return request
  }
}

module.exports = userModels
