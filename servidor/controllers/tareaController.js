const Tarea = require('../models/Tarea') ;
const Proyecto = require('../models/Proyecto') ;
const {validationResult} = require('express-validator')

    //Crea una nueva tarea
    exports.crearTarea = async ( req , res) => {

        //Revisa si hay errores
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            return res.status(400).json({errores:errores.array()}) ;
        }

        

        try {
            //Extrae el proyecto y comprueba si existe
            const {proyecto} = req.body;

            const existeProyecto = await Proyecto.findById(proyecto)
            if(!existeProyecto){
                return res.status(404).json({msg:'Proyecto no encontrado'})
            }

            //Revisar si el proyecto actual pertenece al usuario autenticado
            
            if(existeProyecto.creador.toString()!== req.usuario.id){
                return res.status(401).json({msg:'No autorizado'});
            }

            //Crea la tarea
            const tarea = new Tarea (req.body);
            await tarea.save();
            res.json({tarea})

        } catch (error) {
            console.log(error)
            res.status(500).send('Hubo un error')
        }
    }


    //Obtiene las tareas por proyecto
    exports.obtenerTareas = async (req, res) =>{

        try {
            //Extrae el proyecto y comprueba si existe
            const {proyecto} = req.body;

            const existeProyecto = await Proyecto.findById(proyecto)
            if(!existeProyecto){
                return res.status(404).json({msg:'Proyecto no encontrado'})
            }

            //Revisar si el proyecto actual pertenece al usuario autenticado
            
            if(existeProyecto.creador.toString()!== req.usuario.id){
                return res.status(401).json({msg:'No autorizado'});
            }

            //Obtiene las tareas por proyecto
            const tareas = await Tarea.find({proyecto})
            res.json({tareas})
        } catch (error) {
            console.log(error)
            res.status(500).send('Hubo un error')
        }
    }

    //Actualizar tarea
    exports.actualizarTareas= async ( req, res ) =>{
        try {
            //Extrae el proyecto y comprueba si existe
            const {proyecto , nombre, estado} = req.body;

            //Verifica si existe la tarea 
            let tarea = await Tarea.findById(req.params.id)
            if(!tarea) {
                return res.status(404).json({msg:'No existe esa tarea'});
            }

            //Extrae proyecto
            const existeProyecto = await Proyecto.findById(proyecto)
            
            //Revisar si el proyecto actual pertenece al usuario autenticado
            
            if(existeProyecto.creador.toString()!== req.usuario.id){
                return res.status(401).json({msg:'No autorizado'});
            }


            //Crea un objeto con la nueva informaci??n
            const nuevaTarea= {} ;

            if(nombre){
                nuevaTarea.nombre= nombre
            }
            if(estado){
                nuevaTarea.estado= estado
            }

             //Guardar la tarea
            tarea= await Tarea.findByIdAndUpdate({_id: req.params.id}, nuevaTarea, {new:true})
            
            res.json({tarea})
        } catch (error) {
            console.log(error)
            res.status(500).send('Hubo un error')
        }
    }

    //Elimina una tarea
    exports.eliminarTarea =async ( req, res) =>{
        try {
            //Extrae el proyecto y comprueba si existe
            const {proyecto} = req.body;

            //Verifica si existe la tarea 
            let tarea = await Tarea.findById(req.params.id)
            if(!tarea) {
                return res.status(404).json({msg:'No existe esa tarea'});
            }

            //Extrae proyecto
            const existeProyecto = await Proyecto.findById(proyecto)
            
            //Revisar si el proyecto actual pertenece al usuario autenticado
            
            if(existeProyecto.creador.toString()!== req.usuario.id){
                return res.status(401).json({msg:'No autorizado'});
            }


            //Eliminar
            await Tarea.findByIdAndRemove({_id: req.params.id})
            
            res.json({msg:'Tarea Eliminada'})
        } catch (error) {
            console.log(error)
            res.status(500).send('Hubo un error')
        }

    }