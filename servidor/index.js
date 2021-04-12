const express = require('express') ;
const conectarDB = require('./config/db')

//crear el servidor

const app =express() ;

//Conecta a la base de datos
conectarDB()

app.use(express.json({extended :true})) ;

const PORT = process.env.PORT || 4000 ;


app.get('/', async (req, res) => {
    res.send('hola mundo')
})




//Importar rutas
app.use('/api/usuarios', require('./routes/usuarios')) ;
app.use('/api/auth', require('./routes/auth')) ;
app.use('/api/proyectos', require('./routes/proyectos')) ;
app.use('/api/tareas', require('./routes/tarea')) ;

app.listen( PORT, () =>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`)
})