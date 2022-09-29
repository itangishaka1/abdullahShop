import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler' // because of the following error
/*
throw new Error('Not authorized, no token')
              ^
Error: Not authorized, no token
*/
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  // console.log(req.headers.authorization) // this gives us the token sent from the client
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
        
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // console.log(decoded) // gives us object { id: 'idhere', iat: issuedat, exp: expiredat }

      req.user = await User.findById(decoded.id).select('-password')

      next()
      
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

export { protect }
