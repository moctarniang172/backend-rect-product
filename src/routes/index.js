const router = require('express').Router();

router.use('/auth', require('./auth.routes'))
router.use('/hotels', require('./hotels.routes'))
router.use('/password', require('./oblier.routes'));
router.use('/dashboard', require('./dashboard.routes'));


module.exports = router