import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ingresoUsuarioAccion } from '../redux/UsuarioDucks'

const Login = () => {

  const dispatch = useDispatch()

  return (
    <div className='mt-5 text-center'>
        <h3>Ingreso con google</h3>
        <hr />
        <button 
          onClick={()=> dispatch(ingresoUsuarioAccion())} 
          className='btn btn-dark'>
            Acceder
          </button>
    </div>
  )
}

export default Login