const express = require('express')
const router = express.Router()

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

// controller
const receipeHomeController = require('../Controller/recipeHomeController')
const receipesControllerDetails = require('../Controller/receipesControllerDetails')
const commentsControllerDetails = require('../Controller/commentsControllerDetails')
const userControllers = require('../Controller/userController')
const recipesNewController = require('../Controller/recipesNewController')

// midleware
const Auth = require('../Middleware/Auth')

router.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'api running well'
  })
})

// receipes endpoint
// router.post('/test', upload.single('user-photo'), recipesNewController._test)
router.get('/recipes/search', recipesNewController._search)
router.post(
  '/recipes/add',
  Auth.verify,
  upload.single('recipe-image'),
  recipesNewController._add
)
router.get('/recipes/allRecipes', receipesControllerDetails._getAllReceipes)
router.get(
  '/recipes/:receiptUid',
  receipesControllerDetails._getRecipesByParams
)

// comment endpoint
router.get('/comments', commentsControllerDetails._getAllComments)
router.post('/comments', commentsControllerDetails._addComment)
router.post('/recipes/detail', receipesControllerDetails._getRecipesByTitle)
router.get(
  '/recipes/:recipeUid/detail/comments',
  commentsControllerDetails._getCommentByUID
)

// recipe Popular endpoint
router.get('/home/popular', receipeHomeController.getPopulareRecipe_Controller)
router.get('/home/list', receipeHomeController.getListRecipe_Controller)
router.get('/home/new', receipeHomeController.getNewRecipe_Controller)

// user endpoint
router.post('/user/register', userControllers._userRegister)
router.post('/user/login', userControllers._userLogin)
router.get('/user/profile', Auth.verify, userControllers._userProfile)
router.put('/user/profile/edit', Auth.verify, userControllers._editProfile)
router.put(
  '/user/profile/update-password',
  Auth.verify,
  userControllers._changePassword
)
router.post(
  '/user/profile/update-photo',
  Auth.verify,
  upload.single('user-photo'),
  userControllers._changePhoto
)

module.exports = router
