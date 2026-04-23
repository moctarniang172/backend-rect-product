const Hotel = require('../models/hotels');

// CREER
exports.creerHotel = async (data, userId, file) => {
    return await Hotel.create({
        nom: data.nom,
        adresse: data.adresse,
        email: data.email,
        telephone: data.telephone,
        prix: data.prix,
        devise: data.devise,
        author: userId,
        images: file?.path
    });
};

// GET ALL
exports.getAllHotel = async (userid) => {
    return await Hotel.find({author:userid}).populate('author', 'nom email').sort({ createdAt: -1 });
};

// GET ONE
exports.getOne = async (id) => {
    return await Hotel.findById(id).populate('author', 'nom email');
};

// UPDATE (sécurisé)
exports.update = async (id, data, userId) => {
    const hotel = await Hotel.findById(id);

    if (!hotel) {
        throw new Error("Hotel non trouvé");
    }

    if (hotel.author.toString() !== userId) {
        throw new Error("Unauthorized");
    }

    return await Hotel.findByIdAndUpdate(id, data, { new: true });
};

// DELETE (sécurisé)
exports.supprimer = async (id, userId) => {
    const hotel = await Hotel.findById(id);

    if (!hotel) {
        throw new Error("Hotel non trouvé");
    }

    if (hotel.author.toString() !== userId) {
        throw new Error("Unauthorized");
    }

    return await Hotel.findByIdAndDelete(id);
};