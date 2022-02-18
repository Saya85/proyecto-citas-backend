const { v4: uuidv4 } = require('uuid');
const { Op } = require("sequelize");


const Cita = require('../models/').Citas;

const citasControllers = [];

// 

citasControllers.mostrarCitas = async (req, res, next) => {
  const citas = await Cita.findAll();
  res.status(200).json(citas);
}

// 

citasControllers.nueva =  async (req, res, next) => {
    try {
        const { mascota, veterinario, fecha } = req.body;
        let dia = new Date(fecha);

        const citaExist = await Cita.findAll({
            where:{
               fecha: dia
            }
        });
        if (citaExist[0] !== undefined) { 
            return res.status(401).json({message: 'ya existe una cita'});
        }
        
        const newCita = await Cita.create({ uuid: uuidv4(), uuidUser: req.user[0].uuid, uuidMascota: mascota, uuidVeterinario: veterinario, fecha: dia});
        res.status(200).json(newCita);
    } catch (error) {
        res.status(400).send(error);
    }
}


citasControllers.modificarCita = async (req, res, next) => {
    const { cita, fecha } = req.body;

    try {
        const citaActual = await Cita.findAll({
            where: {
                [Op.and]: [
                    { uuidUser: req.user[0].uuid },
                    { uuid: cita }
                ]
            }
        });
        if (citaActual[0] === undefined) {
            return res.status(401).json({message: 'no existe la cita'});
        }

        let dia = new Date(fecha);
        const citaExist = await Cita.findAll({
            where:{
                fecha: dia
            }
        });
        if (citaExist[0] !== undefined) { 
            return res.status(401).json({message: 'ya existe una cita'});
        }

        const newCita = await Cita.update({ 
                fecha: dia
            }, {
                where: {
                    [Op.and]: [
                        { uuidUser: req.user[0].uuid },
                        { uuid: cita }
                    ]
                }
        });

        if(newCita[0] === 1) {
            res.status(200).json({message: 'hora de cita cambiada'});
        }
    } catch (error) {
        res.status(400).send(error);
    }
  }






// CANCELAR CITA
citasControllers.cancelar = async (req, res, next) => {
    try {
        const { cita } = req.body;
        const citaActual = await Cita.findAll({
            where:{
                uuid: cita
            }
        });
        if (citaActual[0] === undefined) {
            return res.status(401).json({message: 'no existe la cita'});
        }
        // Elimina la cita
        const borrarCita = await Cita.destroy({
            where: {
              uuid: cita
            }
        });
        if( borrarCita === 1){
            res.status(200).json('cita borrada correctamente')
        }
    } catch (error) {
      res.status(500).send(error);
    }
};


citasControllers.porMascota = async (req, res, next) => {
    try {
        const { mascota } = req.body;
        const citasPendientes = await Cita.findAll({
            where:{
                uuidMascota: mascota
            }
        });
        let fechaActual = new Date();
        const filtrarCita = citasPendientes.filter((cita) => {
            if (fechaActual < cita.fecha) {
                return cita;
            }
        });
        res.status(200).json(filtrarCita);
    } catch (error) {
      res.status(500).send(error);
    }
};

module.exports = citasControllers