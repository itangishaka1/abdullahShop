import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
dotenv.config()
// require('dotenv').config()  // was for commonJS syntax

import products from './data/products.js' // when we use import (ES6, we have to add .js extension)

connectDB()

const app = express()
const PORT = process.env.PORT || 5200

app.use(cors())

app.get('/', (req, res) => {
    res.send("From abdullahShop")
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})


app.listen(PORT, console.log(`AbdullahShop server running in ${process.env.NODE_ENV} mode on port:${PORT}`.yellow.bold))