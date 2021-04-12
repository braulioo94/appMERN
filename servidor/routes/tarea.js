const express = require('express') ;
const router = express.Router();
const tareaController = require('../controllers/tareaController') ;
const auth = require ('../middleware/auth') ;
const {check} = require('express-validator') ;
const { route } = require('./usuarios');


    //Crea una tare
    //api/tareas
    router.post('/',
        auth, //Se asegura que el usuario este identificado
        [
            check('nombre','El nombre es obligatorio').not().isEmpty(),
            check('proyecto','El proyecto es obligatorio').not().isEmpty()  
        ],
        tareaController.crearTarea
    )

    //Obtiene las tareas por proyecto
    router.get('/',
        auth, //Se asegura que el usuario este identificado
        tareaController.obtenerTareas
    )

    //Actualiza tarea
    router.put('/:id',
        auth, //Se asegura que el usuario este identificado
        tareaController.actualizarTareas
    )
    
    //Elimina una tarea
    router.delete('/:id',
        auth, //Se asegura que el usuario este identificado
        tareaController.eliminarTarea
    )
    module.exports =router;