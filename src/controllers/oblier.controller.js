
const reset = require('../services/reset.service');

// ─── CONTROLLER 1 ────────────────────────────────────────────────────────────

exports.renitialiser = async (req, res) => {
  try {
    // On extrait l'email du body et on le passe au service
    const { email } = req.body;

    // Le service fait tout le travail, on récupère juste son résultat
    const result = await reset.forgotPasswordService(email);

    // On renvoie le résultat au client avec un status 200
    res.status(200).json(result);

  } catch (err) {
    // Si le service a lancé une erreur avec un status personnalisé, on l'utilise
    // Sinon on tombe sur 500 (erreur serveur inattendue)
    const status = err.status || 500;
    res.status(status).json({ message: err.message });
  }
};

exports.verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    await service.verifyCode(email, code);

    res.json({ message: "Code validé" });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    await service.resetPassword(email, password);

    res.json({ message: "Mot de passe changé" });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};