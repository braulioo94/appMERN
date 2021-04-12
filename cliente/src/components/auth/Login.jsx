import React,{useState} from 'react'
import {Link} from 'react-router-dom'


const Login = () => {

    //State para iniciar sesion
    const [usuario , guardarUsuario] = useState({
        email:'',
        password:''
    }) ;

    //extraer del usuario
    const {email, password} = usuario ;


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
        
        /* if(email.trim() === '' || password.trim()===''){

        } */
       
    }

    return ( 
        <div className='form-usuario'>
            <div className='contenedor-form sombra-dark'>
                <h1>Inicar Sesión</h1>

                <form onSubmit={onSubmit}>
                    <div className='campo-form'>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            name='email'
                            id='email'
                            placeholder=' Tu Email'
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor="password">password</label>
                        <input 
                            type="password"
                            name='password'
                            id='password'
                            value={password}
                            placeholder=' Tu Password'
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form
                    '>
                        <input 
                            type="submit"
                            className='btn btn-primario btn-block'
                            value='Iniciar Sesión'
                        />

                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className='enlace-cuenta'>
                    Obtener cuenta
                </Link>
            </div>
        </div>
    );
}

export default Login;