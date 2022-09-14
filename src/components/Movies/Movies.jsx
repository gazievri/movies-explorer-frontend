import './Movies.css';
import HeaderMovies from './HeaderMovies/HeaderMovies';
import SearchForm from './SearchForm/SearchForm';
import { useState, useEffect } from 'react';
import { getMovies } from '../../utils/api';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [moviesPerPage, setMoviesPerPage] = useState(12);
  const [moviesToRender, setMoviesToRender] = useState([]);

  const handleShowMoreMovies = (num) => {
    setMoviesPerPage(num)
  }

  // Получение полного списка филльмов при загрузке страницы
  useEffect(() => {
    getMovies()
    .then(data => {
      setMovies(data);
      setMoviesToRender(data.slice(0, moviesPerPage))
      console.log(moviesToRender)
    })
  }, [])

  // Обновление отображаемого списка фильма при нажатие на кнопку еще
  useEffect(() => {
    let newListMovies = movies.slice(0, moviesPerPage);
    setMoviesToRender(newListMovies)
  }, [moviesPerPage])

  return (
    <div className='movies'>
      <HeaderMovies />
      <SearchForm />
      <MoviesCardList movies={moviesToRender} handleShowMoreMovies={handleShowMoreMovies} moviesPerPage={moviesPerPage} />
    </div>
  )
}

export default Movies;
