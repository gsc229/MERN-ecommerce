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
// CREATE NEW PRODUCT
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


/* 
 * sell / arrival
 * by sell = products?sortBy=sold&order=desc&limit=4
 * by arrival = products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned

*/
exports.list = (req, res)=>{
  let order = req.query.order ? req.query.order : 'asc'
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
  let limit = req.query.limit ? parseInt(req.query.limit) : 6
  
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products)=>{
      if(err){
        return res.status(400).json({
          message: 'products not found'
        })
      }
      res.send(products)
    })
}

exports.listRelated = async (req, res)=>{
  
  let limit = req.query.limit ? parseInt(req.query.limit) : 6
  console.log("req.product: ",req.product)
  Product.find({ _id: {$ne: req.product}, category: req.product.category})
    .limit(limit)
    .populate('category', '_id, name')
    .exec((err, products)=>{
      if(err){
        return res.status(400).json({
          message: 'products not found'
        })

      }
      res.send(products)
    })

}