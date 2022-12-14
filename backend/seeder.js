import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users) // 1

        const adminUser = createdUsers[0]._id
        const sampleProducts = products.map( product => {
            return {...product, user:adminUser}
        })
        await Product.insertMany(sampleProducts)  // 2
        console.log('Data Imported!')
        process.exit()

    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed!')
        process.exit()

    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

// argv[2] means the second argument we will pass after the name of the script we want to run like for eg:
// node index.js -d
if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}