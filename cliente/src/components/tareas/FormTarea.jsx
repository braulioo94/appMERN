import React,{useContext, useState, useEffect} from 'react' ;
import proyectoContext from '../../context/proyectos/proyectoContext' ;
import tareaContext from '../../context/tareas/tareaContext'


const FormTarea = () => {

    //Extrae si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext) ;
    const{proyecto } = proyectosContext ;

    //Extrae tareaContext
    const tareasContext = useContext(tareaContext) ;
    const{agregarTareas, validarTarea, errorTarea, obtenerTareas,tareaSeleccionada,actualizarTarea,limpiarTarea} = tareasContext

    //Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaSeleccionada !==null){
            guardarTarea(tareaSeleccionada)
        } else{
            guardarTarea({
                nombre :''
            })
        }
    }, [tareaSeleccionada]) ;


    //State del formulario
    const [tarea,guardarTarea] =useState({
        nombre:''
    })
    //Extrae el nombre del proyecto
    const {nombre} =tarea

    //Si no hay proyecto selecionado
    if(!proyecto)return null ;

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto ;

    //Leer los valores del formulario
    const handleChange = e =>{
        guardarTarea(
           { ...tarea,
            [e.target.name]: e.target.value}
        )
    }
    const onSubmit=e =>{
        e.preventDefault();

        //Validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        //Si es edicion o es nueva tarea
        if(tareaSeleccionada === null){
            //Tarea nueva
            //Agregar la nueva tarea al proyecto
            tarea.proyectoID =  proyectoActual.id
            tarea.estado=false ;
            agregarTareas(tarea) ;
        }else{
            //Actualiza tarea existente
            actualizarTarea(tarea) ;
        }
        //Elimina tarea seleccionada del state
        limpiarTarea()

        

        //Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id)
        //Reiniciar el form
        guardarTarea({
            nombre:''
        })


    }

    
    return ( 
        <div className='formulario'>
            <form onSubmit={onSubmit}>
                <div className='contenedor-input'>
                    <input 
                        className='input-text'
                        type="text"
                        placeholder='Nombre Tarea...'
                        name='nombre'
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className='contenedor-input'>
                    <input 
                        className='btn btn-primario btn-submit btn-block'
                        type="submit"
                        value ={tareaSeleccionada   ? 'Editar Tarea'  :  'Agregar Tarea'}
                        
                    />
                </div>
            </form>
            {errorTarea ?<p className='mensaje error'>El nombre de la tarea es obligatorio</p>  :null}
        </div>
    );
}
 
export default FormTarea;