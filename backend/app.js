const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
// import routes
const userRoutes = require('./routes/user')


// app
const app = express()


// mongoose
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true

}).then(()=> console.log('DB Connected'))

// routes middleware
app.use('/api', userRoutes)

const port = process.env.PORT || 8000

app.listen(port, ()=>{
  console.log(`You are running the server on port ${port}`)
})



