import "./MoviesCard.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const MoviesCard = ({ movie, handleClick }) => {
  const { nameRU, trailerLink, duration, image } = movie;
  const [isSaved, setIsSaved] = useState(movie.saved);
  const { pathname } = useLocation();

  // Форматирование продолжительности фильма в часы
  const getTimeFromMins = (duration) => {
    let hours = Math.trunc(duration / 60);
    let minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  };

  // Обрабокта на жатия клика на иконке
  const handleClickOnIcon = () => {
    setIsSaved(!isSaved); // Меняем сстатус сохранения фильма
    handleClick(movie, isSaved); // Выполняем функцию, которая приходит в пропсах (либо из movies либо ищ saved-movies)
  };

  return (
    <div className="moviescard">
      <div className="moviescard__header">
        <div className="moviescard__textblock">
          <h4 className="moviescard__title">{nameRU}</h4>
          <p className="moviescard__duration">{getTimeFromMins(duration)}</p>
        </div>
        <button
          className={`${
            pathname === "/saved-movies"
              ? "moviescard__icon_delete"
              : "moviescard__icon"
          } ${isSaved ? "moviescard__icon_active " : ""}`}
          onClick={handleClickOnIcon}
          type="button"
        ></button>
      </div>
      <a
        className="moviescard__img-link"
        href={trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img className="moviescard__image" src={image} alt={nameRU} />
      </a>
    </div>
  );
};

export default MoviesCard;
