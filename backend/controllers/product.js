const formidable = require('formidable') // for form data and image upload
const _ = require('lodash') //provides some helper methods
const fs = require('fs')
const errorHandler = require('../helpers/dbErrorHandler')
const Product = require('../models/Product')

exports.create = (req, res)=>{  
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files)=>{
    if(err){
      return res.status(400).json({
        error: 'Image could not be uploaded'
      })
    }
    // check for all fields
    const {name, price, description, category, quantity, shipping} = fields
    if(!name || !price || !description || !category || !quantity || !shipping){
      return res.status(400).json({
        error: "All fileds are required"
      })
    }
    let product = new Product(fields)

    if(files.photo){
      // 1kb=1000 1mb = 1000000
      if(files.photo.size > 1000000){
        return res.status(400).json({
          error: "Image should be less than 1MB in size."
        })
      }
      product.photo.data = fs.readFileSync(files.photo.path)
      product.photo.contentType = files.photo.type
    }

    product.save((err, result)=>{
      if(err){
        return res.status(400).json({
          error: errorHandler(err)
        })
      }

      res.status(201).json({
        product: result
      })

    })

  })
}