import './Login.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom'

const Login = ({ handleLogin }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  }

  return (
    <form className='login' onSubmit={handleSubmit}>
      <Logo />
      <h2 className='login__greetings'>Рады видеть!</h2>

      <span className='login__span'>E-mail</span>
      <input className='login__input' type='email'></input>
      <hr className='login__line'></hr>
      <span className='login__error'>Что-то пошло не так...</span>

      <span className='login__span'>Пароль</span>
      <input className='login__input' type='password'></input>
      <hr className='login__line'></hr>
      <span className='login__error'>Что-то пошло не так...</span>

      <button className='login__button'>Войти</button>
      <p className='login__subtitle'>Уже зарегистрированы? <Link to='/signup' className='login__link'>Регистрация</Link></p>


    </form>
  )
}

export default Login;
