const mongoose = require('mongoose') ;

const UsuariosSchema = mongoose.Schema({
    nombre:{
            type:String,
            required:true,
            trim:true
    },
    email:{
            type:String,
            required:true,
            trim:true,
            unique:true //Verifica que el email este disponible para usarlo
    },
    password:{
            type:String,
            required:true,
            trim:true
    },
    registro:{
            type:Date,
            default:Date.now(),
            
    }
}) ;


module.exports=mongoose.model('Usuario', UsuariosSchema)