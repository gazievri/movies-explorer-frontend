import "./Navigation.css";
import { Link } from "react-router-dom";

const Navigation = ({ isLoggedIn, handlePopupOpen }) => {
  // Определяет размер экрана который используется для отображения бургер меню
  const windowInnerWidth = window.innerWidth;

  return (
    <>
      {!isLoggedIn ? (
        <>
          <Link to="/signup" className="navigation__link">
            Регистрация
          </Link>
          <Link to="/signin">
            <button className="navigation__btn">Войти</button>
          </Link>
        </>
      ) : windowInnerWidth <= 891 ? (
        <button type='button' className="navigation__burger" onClick={() => handlePopupOpen() }></button>
      ) : (
        <>
          <nav className="navigation__nav">
            <Link to="/movies" className="navigation__nav-item">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="navigation__nav-item">
              Сохранённые фильмы
            </Link>
          </nav>
          <div className="navigation__accountblock">
            <Link to="/profile" className="navigation__accountblock-text">
              Аккаунт
            </Link>
            <div className="navigation__accountblock-icon"></div>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;
