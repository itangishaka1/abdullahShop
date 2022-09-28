import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

/*
  @desc     Fetch all products
  @route    GET /api/products
  @access   Public
*/
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}) // {} here means give us everything
  res.json(products)
})

/*
  @desc     Fetch single product
  @route    GET /api/products/:id
  @access   Public
*/
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404) // if we do not set this, it will be 500
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById }
