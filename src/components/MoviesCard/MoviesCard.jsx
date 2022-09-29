import "./MoviesCard.css";
import { MOVIE_URL } from "../../utils/constants";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const MoviesCard = ({ movie }) => {
  const { nameRU, duration, image } = movie;
  const url = image.formats.thumbnail.url;
  const [isSaved, setIsSaved] = useState(false);

  const { pathname } = useLocation();

  const getTimeFromMins = (duration) => {
    let hours = Math.trunc(duration / 60);
    let minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  };

  const handleClickSaveMovie = () => {
    setIsSaved(!isSaved);
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
          onClick={handleClickSaveMovie}
          type='button'
        ></button>
      </div>
      <img
        className="moviescard__image"
        src={`${MOVIE_URL}${url}`}
        alt={nameRU}
      />
    </div>
  );
};

export default MoviesCard;
