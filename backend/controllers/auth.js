const User = require('../models/User')
const jwt = require('jsonwebtoken')// used to generate signed token
const expressJwt = require('express-jwt')// authorization check 


const {errorHandler} = require('../helpers/dbErrorHandler')

exports.signUp = (req, res) => {
  console.log(req.body)
  const user = new User(req.body)

  user.save((err, user)=> {
      if(err){
        res.status(400).json({
          err: errorHandler(err)
        })
      }
      user.salt = undefined
      user.hashed_password = undefined
      res.json({
        user
      })

  })

}

exports.signIn = (req, res) => {
  console.log(req.body)
  // find user baseed on email
  const {email, password} = req.body
  User.findOne({email}, (err, user) => {

    if(err || !user){
      return res.status(400).json({
        err: "User with that email does not exist. Please signup!"
      })
    }
    
    // if user is found make sure the email and password is found 
    // create authenticate method in USER MODEL
    if(!user.authenticate(password)){
      return res.status(401).json({
        error: "Email and/or password don't match."
      })
    }

    // generate a signed token with user id and secret
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET)
    // persist the token as 't' in cookie with expiry date
    res.cookie('t', token, {expire: new Date() + 9999})
  
    
    // return response with user and token to frontend client
    const {_id, name, email, role} = user
    return res.json({token, user: {_id, email, name, role}})

  })

}

exports.signOut = (req, res)=> {
  console.log(req.body)
  res.clearCookie('t')
  res.json({"message": "Signout success"})


}
// middleware
exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth" // this line requires cookie-parser ('required' statement in app.js)
})


exports.isAuth = (req, res, next) => {
  console.log('Header: ',req.header('content-type'))
  console.log('isAuth: ',req.profile, req.auth)
  console.log(`prodile._id: ${req.profile._id}, auth.id: ${req.auth.id}`)
  let user = req.profile && req.auth && req.profile._id == req.auth.id
    if(!user){
      return res.status(403).json({
        error: "Access denied"
      })
    }

    next();

}

exports.isAdmin = (req, res, next) => {
  if(req.profile.role === 0){
    return res.status(403).json({
      error: 'Admin only'
    })
  }

  next();
}