var express = require('express');
var router = express.Router();

const citasControllers = require('../controllers/citas');
const auth = require('../middlewares/auth'); 

// 

router.get('/', auth, citasControllers.mostrarCitas);

// 

router.post('/nueva', auth, citasControllers.nueva);

// 

router.delete('/', auth, citasControllers.cancelar);

//

router.post('/modificar', auth, citasControllers.modificarCita);

//

router.get('/cita/mascota', auth, citasControllers.porMascota);

module.exports = router;