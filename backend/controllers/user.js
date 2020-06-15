const User = require('../models/User')

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user)=>{
    if(err||!user){
      return res.status(400).json({
        error: 'User not found'
        
      })
    }
    user.salt = undefined
    user.hashed_password = undefined
    req.profile = user;
    next();


  })
  console.log(req.body)
}

exports.read = (req, res)=>{
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

exports.update = (req, res)=>{
  console.log('user upadate req.profile: ', req.profile)
  console.log('\nuser upadate req.body: ', req.body)
  User.findOneAndUpdate(
    {_id: req.profile._id}, 
    {$set: req.body}, 
    {new: true},
    (err, user) => {
      if(err){
        return res.status(400).json({
          error: 'You are not authorized to perform this action'
        })
      }
    user.salt = undefined
    user.hashed_password = undefined
    res.json(user)
    })
    
}