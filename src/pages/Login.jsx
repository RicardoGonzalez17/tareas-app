import { useState, useEffect } from "react"
import {FaSignInAlt} from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password:''
  })

  const {email, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth)

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess){
      navigate('/')
    }

    dispatch(reset())
  },[user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e)=> {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  if(isLoading)
  {
    return <Spinner />
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Ingresa los siguientes datos para iniciar sesión</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
           <div className="form-group">
              <input 
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Ingresa tu email"
                onChange={onChange}
                 />
              <input 
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Ingresa tu password"
                onChange={onChange}
                 />
           </div>
           <div className="form-group">
              <button type="submit" className="btn btn-block">
                Login
              </button>
           </div>
        </form>
      </section>
    </>
)
}

export default Login