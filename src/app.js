require('dotenv').config()
const connectDB = require('./config/conf.config')
const express = require('express')
const cors = require('cors');

const db = connectDB();

const app = express();

app.use(cors())

app.use(express.json());

app.use('/api', require('./routes'));



module.exports = app;
