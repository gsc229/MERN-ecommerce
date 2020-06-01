const formidable = require('formidable') // for form data and image upload
const _ = require('lodash') //provides some helper methods used in the update product method
const fs = require('fs')
const errorHandler = require('../helpers/dbErrorHandler')
const Product = require('../models/Product')

exports.productById = (req, res, next, id) => { // we get id by from the router.param('productId', productById). Id is a positional argument
  console.log(req.params)
  Product.findById(id).exec((err, product)=>{
    if(err || !product){
      return res.status(404).json({
        error: `Product with id of ${req.params.productId} does not exist.`
      })
    }

    req.product = product
    next()
  })
}


exports.read = (req, res) => {
  req.product.photo = undefined
  return res.json({
    product: req.product
  })
}


exports.remove = (req, res)=>{
  let product = req.product
  product.remove((err, success)=>{
    if(err){
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.status(202).json({message: `Product with id of ${req.params.productId} was successfully deleted.`})
  })
}

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


exports.update = (req, res)=>{  
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

    let product = req.product
    product = _.extend(product, fields)


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
          error: "There was a problem updating your product."
        })
      }

      res.status(201).json({
        product: result
      })

    })

  })
}

