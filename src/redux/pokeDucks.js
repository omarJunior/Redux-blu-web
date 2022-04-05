import axios from "axios";


//constantes
//Estado global de la aplicacion
const dataInicial = {
    count : 0,
    next : null,
    previous : null,
    results : []
}

const OBTENER_POKEMON_EXITO = 'OBTENER_POKEMON_EXITO'
const SIGUIENTE_OBTENER_POKEMON_EXITO = 'SIGUIENTE_OBTENER_POKEMON_EXITO'
const ANTERIOR_OBTENER_POKEMON_EXITO = 'ANTERIOR_OBTENER_POKEMON_EXITO'
const POKE_INFO_EXITO = 'POKE_INFO_EXITO'

//reducer
export default function pokeReducer(state = dataInicial, action){
    switch (action.type) {
        case OBTENER_POKEMON_EXITO:
            return {...state, ...action.payload}

        case SIGUIENTE_OBTENER_POKEMON_EXITO:
            return {...state, ...action.payload}

        case ANTERIOR_OBTENER_POKEMON_EXITO:
            return {...state, ...action.payload}

        case POKE_INFO_EXITO:
            return {...state, unPokemon: action.payload}

        default:
            return state
    }
}

//acciones-La unica forma de cambiar el estado es emitir una accion, el dispatch activa el reducer
export const unPokeDetalleAccion = (url = 'https://pokeapi.co/api/v2/pokemon/1/')=> async(dispatch)=>{

    if(localStorage.getItem(url)){
        dispatch({
            type: POKE_INFO_EXITO,
            payload: JSON.parse(localStorage.getItem(url))
        }) 
        console.log('Desde el localStorage')
        return
    }

    try {
        console.log('Desde la api')
        const resp = await axios.get(url)
        dispatch({
            type: POKE_INFO_EXITO,
            payload: {
                nombre: resp.data.name,
                ancho: resp.data.weight,
                alto: resp.data.height,
                foto: resp.data.sprites.front_default
            }
        })  
        localStorage.setItem(url, JSON.stringify({
            nombre: resp.data.name,
            ancho: resp.data.weight,
            alto: resp.data.height,
            foto: resp.data.sprites.front_default
        }))
    } catch (error) {
        console.error(error)
    }
}

export const obtenerPokemonesAccion = ()=> async(dispatch)=>{

    if(localStorage.getItem('offset=0')){
        dispatch({
            type: OBTENER_POKEMON_EXITO,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        })
    }else{
        try {
            const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10/`)
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