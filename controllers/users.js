
const User = require('../models/user');
const {v4: uiid} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Token = require('../models/tokens');

const usersControllers ={};

//

usersControllers.mostrarUsers = async (req, res, next)=>{
    const users = await User.findAll();
    res.status(200).json(users);
};

//

usersControllers.registrar = async (req, res, next) =>{  
    const {nombre, apellidos, email, password} = req.body;
    const cryptPass = bcrypt.hashSync(password,8);
    const response = await User.create({uiid: uuidv4(), nombre: nombre, apellidos: apellidos, email: email, password: cryptPass });
    const newUser = response.datavalues;
    res.status(201).json(newUser);
};

//

usersControllers.borrar = async (req, res, next)=>{
    const{uuidUser} =req.body;
    const borrado = await User.destroy({
        where:{
            uuid: uuidUser
        }
    });
    if (borrado === 1){
        res.status(200).json('usuario eliminado')
    }
};


usersControllers.login = async(req, res, next)=>{
    try {
        const { email, password } = req.body
        const usuario = await User.findOne({ email: email});
        if (!usuario) { 
            return res.status(401).json({message: 'email incorrecto'});
        }
        const passwordMatch = bcrypt.compare(password, usuario.password);
        if (!passwordMatch) {
            return res.status(401).json({message: 'contraseña incorecta'});
        }
        const token = jwt.sign({uuid: usuario.uuid, nombre: usuario.nombre, email: usuario.email}, process.env.JWT_SECRET)
        const response = await Token.create({ uuid: uuidv4(), token: token, uuidUser: usuario.uuid, device: null});
        res.status(200).json('usuario login');
    } catch (error) {
        res.status(400).send(error);
    }
};

usersControllers.logaut =   async (req, res, next) => { 
    try {
      const tokenBorrado = await Token.destroy({
        where: {
          token: req.token
        }
      });
     if(tokenBorrado === 1) {
       res.status(200).json('deslogueado correctamente.') 
     }
    } catch (error) {
      res.status(400).send(error);
    }
};




module.exports = usersControllers;