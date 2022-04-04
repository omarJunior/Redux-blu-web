import axios from "axios";


//constantes
const dataInicial = {
    count : 0,
    next : null,
    previous : null,
    results : []
}

const OBTENER_POKEMON_EXITO = 'OBTENER_POKEMON_EXITO'
const SIGUIENTE_OBTENER_POKEMON_EXITO = 'SIGUIENTE_OBTENER_POKEMON_EXITO'
const ANTERIOR_OBTENER_POKEMON_EXITO = 'ANTERIOR_OBTENER_POKEMON_EXITO'

//reducer
export default function pokeReducer(state = dataInicial, action){
    switch (action.type) {
        case OBTENER_POKEMON_EXITO:
            return {...state, ...action.payload}

        case SIGUIENTE_OBTENER_POKEMON_EXITO:
            return {...state, ...action.payload}

        case ANTERIOR_OBTENER_POKEMON_EXITO:
            return {...state, ...action.payload}

        default:
            return state
    }
}

//acciones
export const obtenerPokemonesAccion = ()=> async(dispatch, getState)=>{

    if(localStorage.getItem('offset=0')){
        console.log('Datos desde el localstorage')
        dispatch({
            type: OBTENER_POKEMON_EXITO,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        })
    }else{
        try {
            console.log('Datos desde la API')
            const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20/`)
            dispatch({
                type: OBTENER_POKEMON_EXITO,
                payload: resp.data
            })
            localStorage.setItem('offset=0', JSON.stringify(resp.data))
        } catch (error) {
            console.error(error)
        }
    }
}

export const siguientePokemonAction = ()=> async(dispatch, getState)=> {
    const {next} = getState().pokemones
    
    if(localStorage.getItem(next)){
        dispatch({
            type: OBTENER_POKEMON_EXITO,
            payload: JSON.parse(localStorage.getItem(next))
        })
    }else{
        try {
            const resp = await axios.get(next)
            dispatch({
                type: SIGUIENTE_OBTENER_POKEMON_EXITO,
                payload: resp.data
            })
            localStorage.setItem(next, JSON.stringify(resp.data))
        } catch (error) {
            console.error(error)
        }

    }

}

export const anteriorPokemonAccion = ()=> async(dispatch, getState)=>{
    const { previous } = getState().pokemones
    if(localStorage.getItem(previous)){
        dispatch({
            type: OBTENER_POKEMON_EXITO,
            payload: JSON.parse(localStorage.getItem(previous))
        })
    }else{
        try {
            const resp = await axios.get(previous)
            dispatch({
                type: ANTERIOR_OBTENER_POKEMON_EXITO,
                payload: resp.data
            })
            localStorage.setItem(previous, JSON.stringify(resp.data))
        } catch (error) {
            console.error(error)
        }
    }
}