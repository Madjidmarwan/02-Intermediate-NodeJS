require('dotenv').config()
require('express-async-errors')
// Async Errors

const express = require('express')
const app = express()
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

// Middleware
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.send('<h1> Store API </h1><a href = "/api/v1/products">products route</a>')
})
app.use('/api/v1/products', productsRouter)

// Products Route
app.use(notFoundMiddleware)
app.use(errorMiddleware)


const port = process.env.PORT || 4000

const start = async () => {
    try {
        // Connect DB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening to ${port}...`))
    } catch (error) {
        console.log(error)
        
    }
}

start()