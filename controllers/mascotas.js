const express = require('express');
const { v4: uuidv4 } = require('uuid');

const Mascota = require('../models/mascotas');

const mascotasControllers ={};

// 

mascotasControllers.mostrarMascotas = async (req, res, next) => {
  try {
    const mascota = await Mascota.findAll();
    res.status(200).json(mascota);  
  } catch (error) {
    res.status(500).send('error a buscar los datos');
  }
};

//

mascotasControllers.registro =  async (req, res, next) => {
  try {
    const { name, tipo } = req.body;
    const newMascota = await Mascota.create({ uuid: uuidv4(), name: name, tipo: tipo, uuidUser: req.user[0].uuid});
    res.status(200).json(newMascota);
  } catch (error) {
    res.status(500).send('no se ha podido registrar');
  }
};

mascotasControllers.mascotasUsuario =   async (req, res, next) => {
    try {
      const mascotasUsuario = await Mascota.findAll({
        where: {
          uuidUser: req.usuario.uuid
        }
      });
      res.status(200).json(mascotasUsuario);
    } catch (error) {
      res.status(500).send('no se a encontrado ninguna mascota');
    }
};

model.exports= mascotasControllers;