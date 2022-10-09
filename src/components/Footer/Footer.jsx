import "./Footer.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Footer = () => {
  const { pathname } = useLocation();
  const [selector, setSelector] = useState("footer");


  // Отображение футера в зависимости от того, на каком роуте находится пользователь
  useEffect(() => {
    if (
      pathname === "/" ||
      pathname === "/movies" ||
      pathname === "/saved-movies"
    ) {
      setSelector("footer");
    } else {
      setSelector("footer footer_status_hidden");
    }
  }, [pathname]);

  return (
    <footer className={selector}>
      <p className="footer__subtitle">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__info">
        <p className="footer__copyright">{`© ${new Date().getFullYear()}`}</p>
        <ul className="footer__list">
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://github.com/gazievri"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
