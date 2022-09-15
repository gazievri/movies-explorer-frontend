import './Header.css';
import Logo from '../Logo/Logo';

const Header = () => {
  return (
    <div className='header'>
      <Logo />
      <div className='header__link'>Регистрация</div>
      <button className='header__btn'>Войти</button>
    </div>
  )
}

export default Header;