const user = require('../models/user');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// INSCRIPTION
exports.inscription = async (data) => {
    const { nom, email, password } = data;

    if (!nom || !email || !password) {
        throw new Error("remplir tous les champs");
    }

    const verifieremail = await user.findOne({ email });

    if (verifieremail) {
        throw new Error("email est deja existe");
    }

    const hashpassword = await bycrypt.hash(password, 10);

    const creer = await user.create({
        nom,
        email,
        password: hashpassword
    });

    return creer;
};

// LOGIN
exports.login = async (data) => {
    const { email, password } = data;

    if (!email || !password) {
        throw new Error("remplir tous les champs !!");
    }

    const userconnecter = await user.findOne({ email });

    if (!userconnecter) {
        throw new Error("email n'existe pas");
    }

    const verifierPassword = await bycrypt.compare(
        password,
        userconnecter.password
    );

    if (!verifierPassword) {
        throw new Error("mot de passe incorrect");
    }

    const token = jwt.sign(
        { id: userconnecter._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    return { token: token, id: userconnecter._id, nom: userconnecter.nom, // On sort le nom de l'objet user 
             email: userconnecter.email};
};