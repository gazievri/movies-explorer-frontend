import './NavTab.css';

const NavTab = () => {
  return (

    <nav className='navtab'>
      <ul className='navtab__list'>
        <li className='navtab__item'>
          <a className='navtab__link' href='#aboutproject'>О проекте</a>
        </li>
        <li className='navtab__item'>
          <a className='navtab__link' href='#techs'>Технологии</a>
        </li>
        <li className='navtab__item'>
          <a className='navtab__link' href='#aboutme'>Студент</a>
        </li>
      </ul>
    </nav>
  )
}

export default NavTab;