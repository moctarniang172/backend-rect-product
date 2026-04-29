const users = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const service = require('../services/auth.service');

// INSCRIPTION
exports.register = async (req, res) => {
    try {
        
         console.log("req.body →", req.body);
        console.log("req.file →", req.file); 

        const user = await service.inscription(req.body,req.file);

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


exports.getProfil = async (req, res) => {
    try {
        const userProfil = await service.getProfil(req.user.id);
        res.status(200).json({ user: userProfil });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateProfil = async (req, res) => {
    try {
        const userMisAJour = await service.updateProfil(req.user.id, req.body, req.file);
        res.status(200).json({
            message: "Profil mis à jour avec succès",
            user: userMisAJour
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


