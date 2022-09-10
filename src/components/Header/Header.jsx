import './Header.css';

const Header = () => {
  return (
    <div className='header'>
      <div className='header__logo'></div>
      <div className='header__link'>Регистрация</div>
      <button className='header__btn'>Войти</button>
    </div>
  )
}

export default Header;