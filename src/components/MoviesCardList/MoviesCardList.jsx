import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useState, useEffect } from "react";

const MoviesCardList = ({ moviesToRender, moviesPerPage, moviesAddToPage, setMoviesPerPage }) => {
  const [moviesStartPack, setMoviesPack] = useState();
  const [isBtnHidden, setBtnHidden] = useState(false);

  const handleClickMoreMovies = () => {
    if (moviesToRender.length > moviesPerPage) {
      setMoviesPerPage(moviesPerPage + moviesAddToPage)
    }
  }

  console.log(moviesPerPage);

  // При обновлении списка фильмов или количества фильмов на страницу обновляет количество фильмов в списке для отображения в том числе после нажатия клавиши Еще
  useEffect(() => {
    setMoviesPack(moviesToRender.slice(0, moviesPerPage))
  }, [moviesToRender, moviesPerPage])

  useEffect(() => {
    moviesToRender.length > moviesPerPage ? setBtnHidden(false) : setBtnHidden(true);
  }, [moviesToRender, moviesStartPack, moviesPerPage])

  return (
    <div className={ `moviescardlist` } >
      {moviesToRender.length !== 0 ?  (
        <>
          <div className="moviescardlist__container">
            {moviesStartPack.map((movie) => (
              <MoviesCard key={movie.id} movie={movie} />
            ))}
          </div>

          <button
            className={`moviescardlist__btn ${isBtnHidden ? 'moviescardlist__btn_hidden' : ''}`}
            type="button"
            onClick={handleClickMoreMovies}
          >
            Ещё
          </button>
        </>
      )

      :

      (
        <div className='moviescardlist__notfound-message'>Ничего не найдено...</div>
      )}
    </div>
  );
};

export default MoviesCardList;
