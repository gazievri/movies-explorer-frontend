import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useState, useEffect } from "react";
import {
  MOVIES_PER_PAGE_SIZE_MORE_1280,
  MOVIES_PER_PAGE_SIZE_761_1279,
  MOVIES_PER_PAGE_SIZE_LESS_761,
  MOVIES_BTN_ADD_SIZE_MORE_1280,
  MOVIES_BTN_ADD_SIZE_LESS_1279,
} from '../../utils/constants.js'

const MoviesCardList = ({ moviesToRender, flag, handleClick }) => {
  const [moviesStartPack, setMoviesStartPack] = useState(moviesToRender);
  const [isBtnHidden, setIsBtnHidden] = useState(false);
  const [moviesPerPage, setMoviesPerPage] = useState(MOVIES_PER_PAGE_SIZE_MORE_1280);
  const [moviesAddToPage, setMoviesAddToPage] = useState(MOVIES_BTN_ADD_SIZE_MORE_1280);
  console.log(moviesStartPack, 'cardlist')

  // Определение ширины экрана и установление количества отображемых фильмов на страинце и количества добавляемых фильмов при нажатие клавиши Еще
  const checkWindowWidth = () => {
    const screenWidth = window.screen.width;

    if (screenWidth >= 1280) {
      setMoviesPerPage(MOVIES_PER_PAGE_SIZE_MORE_1280);
      setMoviesAddToPage(MOVIES_BTN_ADD_SIZE_MORE_1280);
    } else if (screenWidth < 1280 && screenWidth > 761) {
      setMoviesPerPage(MOVIES_PER_PAGE_SIZE_761_1279);
      setMoviesAddToPage(MOVIES_BTN_ADD_SIZE_LESS_1279);
    } else {
      setMoviesPerPage(MOVIES_PER_PAGE_SIZE_LESS_761);
      setMoviesAddToPage(MOVIES_BTN_ADD_SIZE_LESS_1279);
    }
  };

  // Определяю размер экрана при загрузке страницы
  useEffect(() => {
    checkWindowWidth();
  }, [moviesToRender]);

  // Следит за размерами экрана и запускат функцию checkWindowWidth с задержкой
  window.onresize = (event) => {
    setTimeout(checkWindowWidth, 50);
  };

  // Функция изменяет стейт количество фильмов на странице по принципу
  const handleClickMoreMovies = () => {
    setMoviesPerPage(moviesPerPage + moviesAddToPage);
  };

  // В зависимости от страницы  (movies or saved-movies) управляет состоянием кнопки Еще и количеством фильмов на странице
  useEffect(() => {
    switch (flag) {
      case 'saved':
        setIsBtnHidden(true);
        setMoviesStartPack(moviesToRender)
        break;
      case 'movies':
        if (moviesToRender.length <= moviesPerPage) {
          setIsBtnHidden(true)
        } else {setIsBtnHidden(false)};
        setMoviesStartPack(moviesToRender.slice(0, moviesPerPage));
        break;
      default:
        console.log('error');
        break;
    }

  }, [moviesToRender, flag, moviesPerPage]);

  return (
    <div className={`moviescardlist`}>
      {moviesToRender.length !== 0 ? (
        <>
          <div className="moviescardlist__container">
            {moviesStartPack.map((movie) => (
              <MoviesCard key={ movie.movieId } movie={movie} handleClick={handleClick} />
            ))}
          </div>

          <button
            className={`moviescardlist__btn ${
              isBtnHidden ? "moviescardlist__btn_hidden" : ""
            }`}
            type="button"
            onClick={handleClickMoreMovies}
          >
            Ещё
          </button>
        </>
      ) : (
        <div className="moviescardlist__notfound-message">
          Ничего не найдено...
        </div>
      )}
    </div>
  );
};

export default MoviesCardList;
