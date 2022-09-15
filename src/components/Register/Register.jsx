import './Register.css';
import Logo from '../Logo/Logo';

const Register = () => {
  return (
    <form className='register'>
      <Logo />
      <h2 className='register__greetings'>Добро пожаловать!</h2>

      <span className='register__span'>Имя</span>
      <input className='register__input' type='text'></input>
      <hr className='register__line'></hr>
      <span className='register__error'>Что-то пошло не так...</span>

      <span className='register__span'>E-mail</span>
      <input className='register__input' type='email'></input>
      <hr className='register__line'></hr>
      <span className='register__error'>Что-то пошло не так...</span>

      <span className='register__span'>Пароль</span>
      <input className='register__input' type='password'></input>
      <hr className='register__line'></hr>
      <span className='register__error'>Что-то пошло не так...</span>

      <button className='register__button'>Зарегистрироваться</button>
      <p className='register__subtitle'>Уже зарегистрированы? <a href='#!' className='register__link'>Войти</a></p>
    </form>
  )
}

export default Register;