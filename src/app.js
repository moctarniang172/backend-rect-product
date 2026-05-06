require('dotenv').config();
const connectDB = require('./config/conf.config');
const express = require('express');
const cors = require('cors');

const app = express();

// CORS developpement
// app.use(cors())

// CORS production
app.use(cors({
    origin: "https://moctarniang172.github.io",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.get('/', (req,res)=>{
    res.json({message: "Bienvenue a RED PRODUCT !"});
});

// DB
connectDB();

// Routes
app.use('/api', require('./routes'));

module.exports = app;