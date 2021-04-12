import React,{useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from'../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext'


const NuevaCuenta = () => {

    //Extraer los valores del context 
    const alertaContext = useContext(AlertaContext);
    const{alerta, mostrarAlerta} = alertaContext ;

    const authContext = useContext(AuthContext);
    const{registrarUsuario} = authContext ;
    

    //State para iniciar sesion
    const [usuario , guardarUsuario] = useState({
        email:'', //Es lo que se ingreso como 'name' en los inputs 
        password:'',
        nombre:'',
        confirmar:''
    }) ;

    //extraer del usuario
    const {email, password, nombre, confirmar} = usuario ;


    const onChange = e =>{
        guardarUsuario({
            ...usuario ,
            [e.target.name] : e.target.value}
            )
    } ;


    //Cuando el usario inicia sesión
    const onSubmit = e => {
        e.preventDefault()

        //Validar
        if(email.trim() === '' || password.trim()==='' || nombre.trim()===''|| confirmar.trim() ===''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error') ;
            return;
        }

         //Password minimo de 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error') ;
            return;
        }

        //Los 2 password iguales
        if(password !== confirmar ){
            mostrarAlerta('Los password no son iguales', 'alerta-error') ;
            return;
        }

        //Pasarlos al action
        
    }

    return ( 
        <div className='form-usuario'>
            {alerta ?(<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> )  : null}
            <div className='contenedor-form sombra-dark'>
                <h1>Obtener una cuenta</h1>

                <form onSubmit={onSubmit}>
                    
                    <div className='campo-form'>
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            name='nombre' //Es lo que va en el state de objetos
                            id='nombre'
                            placeholder=' Tu Nombre'
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>
                    
                    <div className='campo-form'>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            name='email' //Es lo que va en el state de objetos
                            id='email'
                            placeholder=' Tu Email'
                            value={email}
                            onChange={onChange}
                        />
                    </div>


                    <div className='campo-form'>
                        <label htmlFor="password">Confirmar Password</label>
                        <input 
                            type="password"
                            name='password' //Es lo que va en el state de objetos
                            id='password'
                            value={password}
                            placeholder='Tu Password '
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor="confirmar">password</label>
                        <input 
                            type="password"
                            name='confirmar' //Es lo que va en el state de objetos
                            id='confirmar'
                            value={confirmar}
                            placeholder=' Confirmar Password'
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form
                    '>
                        <input 
                            type="submit"
                            className='btn btn-primario btn-block'
                            value='Registrarme'
                        />

                    </div>
                </form>
                <Link to={'/'} className='enlace-cuenta'>
                   Volver a Iniciar Sesión
                </Link>
            </div>
        </div>
    );

    
}

export default NuevaCuenta;





