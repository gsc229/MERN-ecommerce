const express = require('express')
const router = express.Router()

const {create, productById, read, remove, update, list, listRelated} = require('../controllers/product')
const {requireSignIn, isAdmin, isAuth} = require('../controllers/auth')
const {userById} = require('../controllers/user')

router.post('/products/create/:userId', requireSignIn,isAuth, isAdmin, create)
router.get('/products/:productId', requireSignIn, read)
router.delete('/products/:productId/:userId', requireSignIn,isAuth, isAdmin, remove)
router.put('/products/:productId/:userId', requireSignIn,isAuth, isAdmin, update)
router.get('/products', list)
router.get('/products/related/:productId', listRelated)


router.param('userId', userById)
router.param('productId', productById)

module.exports = router