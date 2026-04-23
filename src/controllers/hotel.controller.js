const hotelservice = require('../services/hotel.service');

// CREATE
exports.create = async (req, res) => {
  try {
      console.log("1 - body :", req.body);
      console.log("2 - file :", req.file);
      console.log("3 - user :", req.user);
    const hotel = await hotelservice.creerHotel(req.body,req.user.id,req.file);

    res.status(201).json({
      message: "Hôtel créé avec succès",hotel
    });

  } catch (error) {
            console.log("ERREUR COMPLETE :", error); // ✅ pas juste error.message

    res.status(500).json({ message: error.message });
  }
};

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const hotels = await hotelservice.getAllHotel(req.user.id);

    res.status(200).json(hotels);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ONE
exports.getOne = async (req, res) => {
  try {
    const hotel = await hotelservice.getOne(req.params.id);

    res.status(200).json(hotel);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const hotel = await hotelservice.update(req.params.id, req.body, req.user.id, req.file );

    res.status(200).json({
      message: "Hôtel modifié avec succès",
      hotel
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    await hotelservice.supprimer(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      message: "Hôtel supprimé avec succès"
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};