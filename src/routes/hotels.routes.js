const router = require('express').Router();
const middleware = require('../middlewares/auth.middlewares');
const controllerHotel = require('../controllers/hotel.controller');
const {upload} = require('../config/cloudinary.config');

// CREATE
router.post('/', middleware, upload.single("images"), controllerHotel.create);

// GET ALL
router.get('/', middleware, controllerHotel.getAll);

// GET ONE
router.get('/:id', middleware, controllerHotel.getOne);

// UPDATE
router.put(
  '/:id', middleware, upload.single('image'), controllerHotel.update);

// DELETE
router.delete('/:id', middleware, controllerHotel.remove);

module.exports = router;