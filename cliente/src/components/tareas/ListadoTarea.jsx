import React,{Fragment, useContext} from 'react' ;
import Tarea from './Tarea' ;
import proyectoContext from '../../context/proyectos/proyectoContext' ;
import tareaContext from '../../context/tareas/tareaContext'


const ListadoTarea = () => {

    //Extrae el context para usar las variables padre
    const proyectosContext=useContext(proyectoContext) ;
    const{proyecto, eliminarProyecto } = proyectosContext ;

    //Obtener las tareas del proyecto
    const tareasContext =useContext(tareaContext) ;
    const {tareasProyectos}= tareasContext ;

    //Si no hay proyecto selecionado
    if(!proyecto)return <h2>Selecciona algún Proyecto</h2>

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto ;

    

    return ( 
        <Fragment>
            <h2>Proyecto:{proyectoActual.nombre}</h2>

            <ul className='listado-tareas'>
                {tareasProyectos.length=== 0
                ? (<li className='tarea'><p>No hay tareas</p></li>)           

                : tareasProyectos.map(tarea =>(
                    <Tarea  
                        key={tarea.id}
                        tarea={tarea}
                    />
                ))
                }

                
            </ul>
            
            <button
                type='button'
                className='btn btn-eliminar'
                onClick={() => eliminarProyecto(proyectoActual.id)}
                >
                Eliminar Proyecto &times;

            </button>

            
        </Fragment>
    );
}

export default ListadoTarea;