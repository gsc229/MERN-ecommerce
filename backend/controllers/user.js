const User = require('../models/User')


exports.signUp = (req, res) => {
  console.log(req.body)
  const user = new User(req.body)
  user.save((err, user)=>{
    if(err){
      res.status(400).json({
        err
      })
    }

    res.json({
      user
    })

  })

}