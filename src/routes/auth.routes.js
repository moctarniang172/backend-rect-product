const router = require('express').Router();
const authcontroller = require('../controllers/auth.controller')


router.post('/inscription', authcontroller.register);

router.post('/connexion', authcontroller.login);




// router.post('/oblier', authcontroller.oublier);





module.exports = router