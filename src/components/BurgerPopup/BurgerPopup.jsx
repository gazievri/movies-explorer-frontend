import "./BurgerPopup.css";
import { Link, NavLink } from "react-router-dom";

const BurgerPopup = ({ isPopupOpened, handlePopupOpen }) => {
  const setActive = ({ isActive }) =>
    isActive
      ? "burgerpopup__nav-item_active burgerpopup__nav-item"
      : "burgerpopup__nav-item";

  return (
    <div
      className={`burgerpopup ${
        isPopupOpened ? "burgerpopup_status_opened" : ""
      }`}
    >
      <div className="burgerpopup__container">
        <button
          className="burgerpopup__exit-icon"
          type="button"
          onClick={() => handlePopupOpen()}
        ></button>
        <nav className="burgerpopup__nav">
          <NavLink to="/" className={setActive}>
            Главная
          </NavLink>
          <NavLink to="/movies" className={setActive}>
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className={setActive}>
            Сохранённые&nbsp;фильмы
          </NavLink>

          <div className="burgerpopup__accountblock">
            <Link
              to="/profile"
              className="burgerpopup__accountblock-text"
              onClick={() => handlePopupOpen()}
            >
              Аккаунт
            </Link>
            <div className="burgerpopup__accountblock-icon"></div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default BurgerPopup;
