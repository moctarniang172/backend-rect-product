const router = require('express').Router();
const authcontroller = require('../controllers/auth.controller')
const middleware = require('../middlewares/auth.middlewares');

const {upload} = require('../config/cloudinary.config');

const handleUpload = (req, res, next) => {
    upload.single("images")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
  
    })}


router.post('/inscription',upload.single("images"), authcontroller.register);

router.post('/connexion', authcontroller.login);



router.get('/profil', middleware, authcontroller.getProfil);
router.put('/profil', middleware, handleUpload, authcontroller.updateProfil);










module.exports = router