var express = require('express');
var router = express.Router();

/* GET users listing. */
const usersControllers = require('../controllers/users');

const auth = require('../middleware/auth'); 

router.get('/', auth, usersControllers.mostrarUsers);

// REGISTRAR USER
router.post('/registrar', usersControllers.registrar);

// ELIMINAR USER
router.delete('/', auth, usersControllers.borrar);

// MODIFICAR USER
// router.put('/', );

// LOGIN USER
router.post('/login', usersControllers.login);

// LOGOUT USER
router.get('/logout', auth, usersControllers.logaut);

module.exports = router;
