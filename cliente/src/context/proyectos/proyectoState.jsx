import React,{useReducer} from 'react';
import proyectoContext from './proyectoContext' ;
import proyectoReducer from './proyectoReducer' ;
import {FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO,VALIDAR_FORMULARIO,PROYECTO_ACTUAL,ELIMINAR_PROYECTO} from '../../types' ;
import {v4 as uuid} from "uuid";



const ProyectoState = props =>{

    const proyectos=[
        {id: 1, nombre : 'Tienda'},
        { id: 2 ,nombre:'Intraner'},
        { id: 3 ,nombre:'Diseño'}
    
    ]

    const initialState ={
        proyectos :[] ,
        formulario:false,
        errorFormulario:false,
        proyecto:null

    }

    //Dispatch para ejecutar las acciones

    const[ state, dispatch] = useReducer(proyectoReducer, initialState)


    //Serie de funciones para el CRUD 
    const mostrarFormulario = () => {
        dispatch({
            type:FORMULARIO_PROYECTO
        })
    }

    //Obtener los proyectos
    const obtenerProyectos = () =>{
        dispatch({
            type:OBTENER_PROYECTOS,
            payload:proyectos
        })
    }

    //Valida formulario por errores
    const mostrarError = () => {
        dispatch({
            type:VALIDAR_FORMULARIO,

        })
    }

    //Agregar nuevo proyecto a la parte de abjo de la pagina una vez agregado
    const agregarProyecto = proyecto =>{
        proyecto.id= uuid();
        //Insertar el proyecto en el state
        dispatch({
            type:AGREGAR_PROYECTO,
            payload:proyecto
        })
    }
    
    // Selecciona el Proyecto que el usuario dio click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //Elimina el proyecto
    const eliminarProyecto = proyectoId =>{
        dispatch({
            type:ELIMINAR_PROYECTO,
            payload : proyectoId
        })
    }
    return (
        <proyectoContext.Provider
            value={{
                proyectos:state.proyectos,
                formulario:state.formulario,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError: mostrarError,
                errorFormulario:state.errorFormulario,
                proyecto:state.proyecto,
                proyectoActual,
                eliminarProyecto

            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )

}

export default ProyectoState ;