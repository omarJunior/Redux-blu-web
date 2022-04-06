import { firebase, auth } from '../firebase'

//data inicial
const dataInicial = {
    loading: false,
    activo : false
}

const LOADING = 'LOADING'
const USUARIO_ERROR = 'USUARIO_ERROR'
const USUARIO_EXITO = 'USUARIO_EXITO'

//reducer
export default function usuariosReducer(state= dataInicial, action){
    switch (action.type) {
        case LOADING:
            return {...state, loading: true}

        case USUARIO_ERROR:
            return {...dataInicial}

        case USUARIO_EXITO:
            return {...state, loading: false, user: action.payload}
    
        default:
            return { ...state }
    }
}


//acciones
export const ingresoUsuarioAccion = ()=> async(dispatch)=>{
    dispatch({
        type: LOADING
    })
    try {
        const provider = new firebase.auth.GoogleAuthProvider()
        const resp = await auth.signInWithPopup(provider)
        console.log(resp)
        dispatch({
            type: USUARIO_EXITO,
            payload: {
                uid: resp.user.uid,
                email: resp.user.email
            }
        })
        localStorage.setItem('usuario', JSON.stringify({
            uid: resp.user.uid,
            email: resp.user.email
        }))

    } catch (error) {
        console.error(error)
        dispatch({
            type: USUARIO_ERROR
        })
    }
}

export const leerUsuarioActivo = ()=> (dispatch)=>{
    if(localStorage.getItem('usuario')){
        dispatch({
            type: USUARIO_EXITO,
            payload: JSON.parse(localStorage.getItem('usuario'))
        })
    }
}