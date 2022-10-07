import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const MoviesCardList = ({ moviesToRender, flag, handleClick }) => {
  const [moviesStartPack, setMoviesStartPack] = useState(moviesToRender);
  const [isBtnHidden, setIsBtnHidden] = useState(false);
  const [moviesPerPage, setMoviesPerPage] = useState(12);
  const [moviesAddToPage, setMoviesAddToPage] = useState(3);
  console.log(moviesStartPack, 'cardlist')

  // Определение ширины экрана и установление количества отображемых фильмов на страинце и количества добавляемых фильмов при нажатие клавиши Еще
  const checkWindowWidth = () => {
    const screenWidth = window.screen.width;

    if (screenWidth >= 1280) {
      setMoviesPerPage(12);
      setMoviesAddToPage(3);
    } else if (screenWidth < 1280 && screenWidth > 761) {
      setMoviesPerPage(8);
      setMoviesAddToPage(2);
    } else {
      setMoviesPerPage(5);
      setMoviesAddToPage(2);
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

  const handleClickMoreMovies = () => {
    setMoviesPerPage(moviesPerPage + moviesAddToPage);
  };

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
