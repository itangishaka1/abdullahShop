/*     ------------ CUSTOM ERROR HANDLING ------     */

// Handle 404 error for the routes that do not exist in our App
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

// With error middleware, if you want to override the default error handler, YOU START WITH "error" not req
const customErrorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export { notFound, customErrorHandler }