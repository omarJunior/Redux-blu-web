import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerPokemonesAccion, siguientePokemonAction, anteriorPokemonAccion } from '../redux/pokeDucks'


const Pokemones = () => {
    //el dispatch llama la accion, y el useSelector es el que mostrara el arreglo
    const dispatch = useDispatch()

    //el devuelve todo lo que tenemos en la tienda
    const pokemones = useSelector(store => store.pokemones.results)
    const next = useSelector(store => store.pokemones.next)
    const previous = useSelector(store => store.pokemones.previous)
    
  return (
    <div className='row'>
        <div className="col-md-6">
            <h3>Lista de pokemones</h3>
            <div className='d-flex justify-content-between'>
                { previous && (<button className='btn btn-dark ml-2' onClick={()=> dispatch(anteriorPokemonAccion()) }>Anterior</button>) }
                { pokemones.length == 0 && ( <button className='btn btn-dark ml-2' onClick={()=> dispatch(obtenerPokemonesAccion()) }>getPokemon</button> ) }
                { next && (<button className='btn btn-dark ml-2' onClick={()=> dispatch(siguientePokemonAction()) }>Siguiente</button>)}
            </div>
            <ul className='list-group mt-3'>
                {
                    pokemones.map((item, index)=> (
                        <li key={index} className='list-group-item text-uppercase'>
                            {item.name}
                            <button className='btn btn-dark btn-sm float-right'>Info</button>
                        </li>
                    ))
                }
            </ul>
        </div>
        <div className="col-md-6">
           <h3> Detalle de un pokemon</h3>
        </div>
        
    </div>
  )
}

export default Pokemones