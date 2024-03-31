const express = require('express')
const cors = require('cors')
const connectdb = require('../config/connectdb')
const initRoutes = require('../routes/index')
const cookieParser = require('cookie-parser')
require("dotenv").config()

const app = express()
connectdb()
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 9999

app.get('/',(req, res) => {
    res.send('Server On')
})

initRoutes(app)

app.listen(9000,() => {
    console.log('Server on' + port)
})