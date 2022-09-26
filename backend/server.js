import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import { notFound, customErrorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import colors from 'colors'

import productRoutes from './routes/productRoutes.js'

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5200

app.use(cors())


app.get('/', (req, res) => {
    res.send("From abdullahShop")
})

app.use('/api/products', productRoutes)

// Handle 404 error for the routes that do not exist in our App
app.use(notFound )

// custom errors
app.use(customErrorHandler)

app.listen(PORT, console.log(`AbdullahShop server running in ${process.env.NODE_ENV} mode on port:${PORT}`.yellow.bold))