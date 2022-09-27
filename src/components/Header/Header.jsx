import "./Header.css";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';

const Header = ({ isLoggedIn, handlePopupOpen }) => {
  const { pathname } = useLocation();
  const [selector, setSelector] = useState();


useEffect(() => {
  switch (pathname) {
    case '/':
      setSelector('')
      break;
    case '/movies':
      setSelector('header_status_on-movies')
      break;
    case '/saved-movies':
      setSelector('header_status_on-movies')
      break;
    case '/profile':
      setSelector('header_status_on-movies')
      break;
    default:
      setSelector('header_status_hidden')
  }

}, [pathname])

  return (
    <header
      className={
        !isLoggedIn
          ? `header ${selector}`
          : `header header_status_logged-in ${selector}`
      }
    >
      <Logo />
      <Navigation isLoggedIn={isLoggedIn} handlePopupOpen={handlePopupOpen } />
    </header>
  );
};

export default Header;
