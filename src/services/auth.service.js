const user = require('../models/user');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// INSCRIPTION
exports.inscription = async (data, file) => {
    const { nom, email, password } = data;

    if (!nom || !email || !password) {
        throw new Error("Veuillez remplir tous les champs");
    }

    const verifierEmail = await user.findOne({ email });

    if (verifierEmail) {
        throw new Error("Cet email existe déjà");
    }

    const hashpassword = await bycrypt.hash(password, 10);

    const creer = await user.create({
        nom,
        email,
        images: file ? file.path : null,  // ✅ corrigé
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

// GET profil
exports.getProfil = async (userId) => {
    const userTrouve = await user.findById(userId).select('-password -resetToken -resetTokenExpiry -resetCode -resetCodeExpire -resetAttempts');

    if (!userTrouve) {
        throw new Error("Utilisateur introuvable");
    }

    return userTrouve;
};

// PUT profil
exports.updateProfil = async (userId, data, file) => {
    const { nom, email } = data;

    // Si email modifié, vérifier qu'il n'existe pas déjà
    if (email) {
        const emailExiste = await user.findOne({ email, _id: { $ne: userId } });
        if (emailExiste) {
            throw new Error("Cet email est déjà utilisé");
        }
    }

    const champs = {};
    if (nom) champs.nom = nom;
    if (email) champs.email = email;
    if (file) champs.images = file.path;  // Cloudinary

    const userMisAJour = await user.findByIdAndUpdate(
        userId,
        champs,
        { new: true }  // retourne le document mis à jour
    ).select('-password -resetToken -resetTokenExpiry -resetCode -resetCodeExpire -resetAttempts');

    return userMisAJour;
};