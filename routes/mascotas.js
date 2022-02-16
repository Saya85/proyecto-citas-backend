
var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const mascotasControllers = require('../controllers/mascotas');

const auth = require('../middleware/auth'); 

// 

router.get('/', auth, mascotasControllers.mostrarMascotas);

// 

router.post('/registro', auth, mascotasControllers.registro);

//

router.get('/mascotas', auth, mascotasControllers.mascotasUsuario);

module.exports = router;