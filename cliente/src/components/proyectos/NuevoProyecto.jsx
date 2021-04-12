import React,{Fragment, useContext, useState} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'

const NuevoProyecto = () => {

    //Obtener el state del formulario
    const proyectosContext=useContext(proyectoContext) ;
    const{formulario, mostrarFormulario, agregarProyecto,mostrarError,errorFormulario } = proyectosContext //Extrae las variables creadas en proyectoState con context em proyectContext

    const [proyecto, guardarProyecto] = useState({
        nombre:'',
        id:''
    });
    
    //Extrae nombre de proyecto
    const {nombre} = proyecto ;

    //Lee los contenidos del input
    const onChangeProyecto = e =>{
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    //Cuando el usuario envia un proyecto
    const onSubmitProyecto = e =>{
        e.preventDefault()

        //Validar el proyecto
        if(nombre.trim() ===''){
            mostrarError() ;
            return 
        }

        //Agregar al state

        agregarProyecto(proyecto)
        //Reiniciar el form

        guardarProyecto({
            nombre:''
        })

    }


    return ( 
        <Fragment>
            <button 
                type='button'
                className='btn btn-block btn-primario'
                onClick={() => mostrarFormulario()}

            ><strong>Nuevo Proyecto</strong></button>

            {formulario 
                ? 
                    (
                        <form 
                            className='formulario-nuevo-proyecto'
                            onSubmit={onSubmitProyecto}
                        >
                            <input 
                                type="text"
                                id='nuevo-proyecto'
                                className='input-text-1'
                                name='nombre'
                                placeholder='Nombre de su proyecto' 
                                value={nombre}
                                onChange={onChangeProyecto}
                            />
                            <input 
                                type="submit"
                                className='btn btn-primario btn-block'
                                value='Agregar Proyecto'
                            />
                        </form>
                    )

                : null}
            {errorFormulario 
                ? <p className='mensaje error'>El nombre del proyecto es obligatorio</p>
                : null
            }
        </Fragment>

    );
}

export default NuevoProyecto;