const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const expressValidator = require('express-validator')


require('dotenv').config()
// import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')

// EXPERIMENTAL ROUTES
const cryptoExperiements = require('./routes/cyptofun')

// app
const app = express()

// mongoose
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true

}).then(()=> console.log('DB Connected'))

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors)
// routes middleware
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)

// EXPERIMENTAL
app.use('/api', cryptoExperiements)




const port = process.env.PORT || 8000

app.listen(port, ()=>{
  console.log(`You are running the server on port ${port}`)
})



