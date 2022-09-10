import './NavTab.css';

const NavTab = () => {
  return (
    <nav className='navtab'>
      <ul className='navtab__list'>
        <li className='navtab__item'>О проекте</li>
        <li className='navtab__item'>Технологии</li>
        <li className='navtab__item'>Студент</li>
      </ul>
    </nav>
  )
}

export default NavTab;