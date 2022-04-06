//Tienda de react que contendra todos los estados
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import pokeReducer from './pokeDucks' 
import usuariosReducer, { leerUsuarioActivo } from './UsuarioDucks'

 
const rootReducer = combineReducers({
    pokemones: pokeReducer,
    usuario: usuariosReducer,
})
 
//Se crea la tienda
export default function generateStore() {
    const store = createStore( rootReducer, composeWithDevTools( applyMiddleware(thunk) ) )
    leerUsuarioActivo()(store.dispatch)
    return store
}