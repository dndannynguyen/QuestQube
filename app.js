const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const userModel = require('./models/user')
const bcrypt = require('bcrypt')
const joi = require('joi')
const app = express()
require('dotenv').config();

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));
app.set('view engine', 'ejs')
const expireTime = 1000 * 60 * 60

app.use(session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: true,
}))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = app