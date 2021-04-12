import React,{useContext,useEffect} from 'react' ;
import Proyecto from './Proyecto' ;
import proyectoContext from '../../context/proyectos/proyectoContext' ;
import {TransitionGroup, CSSTransition } from 'react-transition-group' ;

const ListadoProyectos = () => {

    //Extraer proyectos del state inicial
    const proyectosContext=useContext(proyectoContext) ;
    const{proyectos,obtenerProyectos  } = proyectosContext //Extrae las variables creadas en proyectoState con context em proyectContext

    
    //Obtener proyectos cuando carga el componente
    useEffect(() => {
        obtenerProyectos()
        //eslint-disable-next-line
    }, [])


    //Revisa si proyectos tiene contenido
    if(proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>

    return ( 
        <ul className='listado-proyectos'>
            {proyectos.map(proyecto =>(
                <Proyecto key={proyecto.id} proyecto={proyecto} />
            ))}
        </ul>
    );
}

export default ListadoProyectos;