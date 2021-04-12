const Usuario =require('../models/Usuario') ;
const bcryptjs = require('bcryptjs') ;
const {validationResult} = require('express-validator') ;
const jwt = require('jsonwebtoken')

exports.autentificarUsuario = async(req, res) => {

    //Revisa si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()}) ;
    }

    //Extrae el email y password
    const{email, password} = req.body
    try{
        //Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            res.status(400).json({msg:'El usuario no existe'})
        }
        //Revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg:'Password incorrecto'})
        }

        //Crear y firmar el JWT
        const payload={
            usuario:{
                id:usuario.id
            }
        };

        
        // Si todo es correcto firmar el JWT
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn:3600 //Mantiene la sesion abierta por 1 hora 
        },(error, token) =>{
            if(error) throw error ;
            
            //Mensaje de confirmacion
            res.json( { token})
        })

    }catch(error){
        console.log(error)
    }
}