const router = require('express').Router();
const oblier = require('../controllers/oblier.controller');

router.post('/', oblier.renitialiser);
// router.post('/newpass/:token', oblier.nouveau_pass);
router.post('/code', oblier.verifyCode);
router.post("/reset", oblier.resetPassword);


module.exports = router;