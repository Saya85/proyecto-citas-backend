var express = require('express');
var router = express.Router();

/* GET users listing. */
const usersController = require('../controllers/users');

const auth = require('../middlewares/auth'); 

router.get('/', auth, usersController.mostrarUsers);

// 
router.post('/registrar', usersController.registrar);

// 
router.delete('/', auth, usersController.borrar);


// 
router.post('/login', usersController.login);

// 
router.get('/logout', auth, usersController.logaut);

module.exports = router;
