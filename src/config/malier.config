const nodemailer = require('nodemailer');

// On crée un "transporteur" = l'objet qui sait comment envoyer des emails
const transporter = nodemailer.createTransport({
  service: 'gmail',         // on dit à Nodemailer qu'on utilise Gmail
  auth: {user: process.env.EMAIL_USER,   // ton adresse Gmail 
         pass: process.env.EMAIL_PASS,   // le App Password (pas ton vrai mdp)
  },
});

module.exports = transporter;