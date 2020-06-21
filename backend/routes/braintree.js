const express = require('express')
const router = express.Router()
const {requireSignIn, isAuth } = require('../controllers/auth')
const {generateToken} = require('../controllers/braintree')
const { userById } = require('../controllers/user')

router.get('/braintree/getToken/:userId', requireSignIn, isAuth, generateToken) 


router.param('userId', userById)

module.exports = router
