
import React,{useReducer} from 'react';
import TareaContext from './tareaContext' ;
import tareaRecuder from './tareaReducer' ;
/* import uuid from 'uuid' ; */

import {AGREGAR_TAREA, VALIDAR_TAREA, TAREAS_PROYECTO,ELIMINAR_TAREA,ESTADO_TAREA, TAREA_ACTUAL , ACTUALIZAR_TAREA, LIMPIAR_TAREA } from "../../types"

const TareaState = props =>{
    const initialState ={
        tareas: [
            {id : 1 ,nombre:'Elegir Plataforma', estado:true, proyectoID: 1} ,
            {id : 2 ,nombre:'Elegir Colores', estado:false, proyectoID: 2} ,
            {id : 3 ,nombre:'Elegir Plataforma de Pago', estado:false, proyectoID: 3} ,
            {id : 4 ,nombre:'Elegir Hosting', estado:true, proyectoID: 4},
            {id : 5 ,nombre:'Elegir Plataforma', estado:true, proyectoID: 4} ,
            {id : 6 ,nombre:'Elegir Colores', estado:false, proyectoID: 1} ,
            {id : 7 ,nombre:'Elegir Plataforma de Pago', estado:false, proyectoID: 3} ,
            {id : 8 ,nombre:'Elegir Hosting', estado:true, proyectoID: 2}
        ],
        tareasProyectos:null,
        errorTarea:false,
        tareaSeleccionada:null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(tareaRecuder,initialState) ;

    //Crea las funciones 

    //Obtener las tares de un proyecto
    const obtenerTareas = proyectoID =>{
        dispatch({
            type:TAREAS_PROYECTO,
            payload: proyectoID
        })
    }
    //Agregar una tarea al proyecto seleccionado
    const agregarTareas = tarea =>{
        /* tarea.id = uuid.v4() ; */
        dispatch({
            type:AGREGAR_TAREA,
            payload:tarea})
    }
    //Valida y muestra un error
    const validarTarea = () =>{
        dispatch({
            type:VALIDAR_TAREA
        })
    }

    //Eliminar tarea por su id
    const eliminarTarea = id =>{
        dispatch({
            type:ELIMINAR_TAREA,
            payload:id
        })
    }

    //Cambie el estado de cada tarea
    const cambiarEstadoTarea = tarea =>{
        dispatch({
            type:ESTADO_TAREA,
            payload:tarea
        })
    }

    //Extrae una tarea para edicion
    const guardarTareaActual= tarea =>{
        dispatch({
            type:TAREA_ACTUAL,
            payload:tarea
        })
    }

    //Edita una tarea 
    const actualizarTarea = tarea =>{
        dispatch({
            type:ACTUALIZAR_TAREA,
            payload:tarea
        })
    }
    //Elimina la tarea seleccionada
    const limpiarTarea = () =>{
        dispatch({
            type:LIMPIAR_TAREA
        })
    }


    return (
        <TareaContext.Provider
        value={{
            tareas:state.tareas,
            obtenerTareas,
            tareasProyectos:state.tareasProyectos,
            agregarTareas,
            errorTarea:state.errorTarea,
            validarTarea,
            eliminarTarea,
            cambiarEstadoTarea,
            guardarTareaActual,
            tareaSeleccionada:state.tareaSeleccionada,
            actualizarTarea,
            limpiarTarea
        }}>
            {props.children}


        </TareaContext.Provider>
    )

    }
export default TareaState ;










