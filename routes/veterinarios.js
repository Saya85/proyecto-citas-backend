

var express = require('express');
var router = express.Router();

const veterinariosController = require('../controllers/veterinarios');

// MOSTRAR VETERINARIOS
router.get('/', veterinariosController.veterinariosAll);

// REGISTRAR VETERINARIOS
router.post('/registro', veterinariosController.register);

module.exports = router;