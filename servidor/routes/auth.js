//Rutas para autentificar usuarios
const express = require('express') ;
const router = express.Router() ;
const {check} = require('express-validator') ;
const authController = require('../controllers/authController')

//Ingresa a la cuenta
//api/auth
router.post('/',
    [
        //Valida la informacion enviada
        check('email','Agrega un email valido').isEmail(),
        check('password','El password debe ser minimo de 6 caracteres').isLength({min:6})
    ],
    authController.autentificarUsuario
)

module.exports= router ;