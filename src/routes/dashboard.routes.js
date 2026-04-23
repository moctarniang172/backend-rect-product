const router = require('express').Router();
const dashboardController = require('../controllers/dashboard.controller');
const verficationtoken = require('../middlewares/auth.middlewares');

router.get('/stats', verficationtoken, dashboardController.dashboard);

module.exports = router;