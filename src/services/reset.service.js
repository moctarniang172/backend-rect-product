const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto'); // ✅ IMPORTANT
const User = require('../models/user');
const transporter = require('../config/malier.config');

                      // etape-1  
const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error('Aucun compte avec cet email.');
    error.status = 404;
    throw error;
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // ✅ SHA256 avec crypto (correct)
  const hashedCode = crypto
    .createHash("sha256").update(code).digest("hex");

  user.resetCode = hashedCode;
  user.resetCodeExpire = Date.now() + 15 * 60 * 1000;
  user.resetAttempts = 0;

  await user.save();

  await transporter.sendMail({
  to: user.email,
  subject: 'Code de réinitialisation de mot de passe',
  html: `
    <div style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px;">
      <div style="max-width:500px; margin:auto; background:#ffffff; padding:20px; border-radius:10px; box-shadow:0 2px 10px rgba(0,0,0,0.1);">

        <h2 style="text-align:center; color:#333;">Réinitialisation de mot de passe</h2>

        <p style="font-size:16px; color:#555;">
          Bonjour,
        </p>

        <p style="font-size:16px; color:#555;">
          Voici votre code de réinitialisation :
        </p>

        <div style="text-align:center; margin:20px 0;">
          <span style="display:inline-block; font-size:24px; letter-spacing:5px; font-weight:bold; background:#f0f0f0; padding:10px 20px; border-radius:8px; color:#000;">
            ${code}
          </span>
        </div>

        <p style="font-size:14px; color:#777;">
          Ce code est valable pour une durée limitée. Ne le partagez avec personne.
        </p>

        <hr style="margin:20px 0;" />

        <p style="font-size:12px; color:#aaa; text-align:center;">
          © ${new Date().getFullYear()} Votre Application. Tous droits réservés.
        </p>

      </div>
    </div>
  `
});

return { message: 'Code envoyé par email' };
};


                      // etape-2
const verifyCode = async (email, code) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Utilisateur introuvable");

  const hashedCode = crypto
    .createHash("sha256").update(code).digest("hex");

  if (user.resetAttempts >= 5) {
    throw new Error("Trop de tentatives");
  }

  if (user.resetCode !== hashedCode) {
    user.resetAttempts += 1;
    await user.save();
    throw new Error("Code invalide");
  }

  if (user.resetCodeExpire < Date.now()) {
    throw new Error("Code expiré");
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "10m" }
  );

  return { message: "Code validé", token };
};

// etape-3

const resetPassword = async (token, password) => {
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new Error("Token invalide ou expiré");
  }

  const user = await User.findById(decoded.id);

  if (!user) throw new Error("Utilisateur introuvable");

  const hash = await bcrypt.hash(password, 10);
  user.password = hash;

  user.resetCode = null;
  user.resetCodeExpire = null;
  user.resetAttempts = 0;

  await user.save();

  return { message: "Mot de passe réinitialisé" };
};

module.exports = { forgotPasswordService, verifyCode, resetPassword };

// user.resetToken       = resetToken;
//   user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);