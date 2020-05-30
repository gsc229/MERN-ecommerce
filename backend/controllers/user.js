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
  const {email, passowrd} = req.body
  User.findOne({email}, (err, user) => {
    if(err || !user){
      return res.status(400).json({
        err: "User with that email does not exist. Please signup!"
      })
    }
    // if user is found make sure the email and password is found 
    // create authenticate method in user model
    if(!user.authenticate(passowrd)){
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