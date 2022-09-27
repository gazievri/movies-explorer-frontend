import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useState, useEffect } from "react";

const MoviesCardList = ({ movies, handleShowMoreMovies, moviesPerPage }) => {
  const handleClickMoreMovies = () => {
    const containerInnerWidth = document.querySelector(
      ".moviescardlist__container"
    ).offsetWidth;
    let numAddMovies;
    if (containerInnerWidth < 1140 && containerInnerWidth > 701) {
      numAddMovies = 2;
    } else if (containerInnerWidth <= 701) {
      numAddMovies = 1;
    } else {
      numAddMovies = 3;
    }

    handleShowMoreMovies(moviesPerPage + numAddMovies);
  };

  return (
    <div className="moviescardlist">
      <div className="moviescardlist__container">
        {!movies ? (
          <Preloader />
        ) : (
          movies.map((movie) => <MoviesCard key={movie.id} movie={movie} />)
        )}
      </div>
      <button
        className="moviescardlist__btn"
        type="button"
        onClick={handleClickMoreMovies}
      >
        Ещё
      </button>
    </div>
  );
};

export default MoviesCardList;
