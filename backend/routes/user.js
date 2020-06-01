const express = require('express')
const router = express.Router()
const {userById} = require('../controllers/user')
const {requireSignIn, isAdmin, isAuth } = require('../controllers/auth')

router.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req, res)=>{
  res.json({
    user: req.profile
  })
})

router.param("userId", userById)



// TEST FOR requireSignIn
/* router.get('/hello', requireSignIn, (req, res)=>{
  res.send('hello there this needs sign in.')
}) */

module.exports = router