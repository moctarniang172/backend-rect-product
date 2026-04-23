const users = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const service = require('../services/auth.service');

// INSCRIPTION
exports.register = async (req, res) => {
    try {
        const user = await service.inscription(req.body);

        res.status(201).json({
            message: "compte creer avec succes",
            user
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// CONNEXION
exports.login = async (req, res) => {
    
    try {
        const userlogin = await service.login(req.body);

        res.status(200).json({
            message: "connexion avec succes",
            ...userlogin
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


