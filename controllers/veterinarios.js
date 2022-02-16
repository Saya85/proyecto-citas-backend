var express = require('express');
const { v4: uuidv4 } = require('uuid');

const Veterinario = require('../models/veterinarios');
const veterinarioControllers = [];

// 

veterinarioControllers.veterinariosAll = async (req, res, next) => {
    const veterinario = await Veterinario.findAll();
    res.status(200).json(veterinario);
};

// 
veterinarioControllers.register = async (req, res, next) => {
  try {
    const { nombre, apellidos } = req.body;
    const newVeterinario = await Veterinario.create({ uuid: uuidv4(), nombre: nombre, apellidos: apellidos});
    res.status(200).json(newVeterinario);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = veterinarioControllers