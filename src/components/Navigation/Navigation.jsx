import './Navigation.css';
import { Link } from 'react-router-dom';

const Navigation = ({ isLoggedIn }) => {

  return (
    <>
      {
        !isLoggedIn ? <>
          <Link to='/signup' className='navigation__link'>Регистрация</Link>
          <Link to='/signin'>
            <button className='navigation__btn'>Войти</button>
          </Link>
        </> :
        <>
          <nav className='navigation__nav'>
            <Link to='/movies' className='navigation__nav-item'>Фильмы</Link>
            <Link to='/saved-movies' className='navigation__nav-item'>Сохранённые фильмы</Link>
          </nav>
          <div className='navigation__accountblock'>
            <Link to='/profile' className='navigation__accountblock-text'>Аккаунт</Link>
            <div className='navigation__accountblock-icon'></div>
          </div>
        </>
      }</>
  )
}

export default Navigation;