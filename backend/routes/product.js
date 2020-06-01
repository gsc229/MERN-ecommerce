const express = require('express')
const router = express.Router()

const {create} = require('../controllers/product')
const {requireSignIn, isAdmin, isAuth} = require('../controllers/auth')
const {userById} = require('../controllers/user')

router.post('/products/create/:userId', requireSignIn,isAuth, isAdmin, create)


router.param('userId', userById)

module.exports = router