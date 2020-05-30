const express = require('express')
const app = express()
require('dotenv').config()

app.get('/', (req, res)=>{
  res.send('here you go')
})


const port = process.env.PORT || 8000

app.listen(port, ()=>{
  console.log(`You are running the server on port ${port}`)
})



