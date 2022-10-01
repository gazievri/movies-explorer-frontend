import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import { useState, useEffect } from 'react';
import { getMovies } from '../../utils/MoviesApi';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import filterMovies from '../../utils/FilterMovies';

const Movies = () => {
  // Извлекаю базу фильмов из LocalStorage, проверяю на длинну и возращую значение для обновления стейта movies
  const extractMoviesLocal = () => {
    let moviesLocal = JSON.parse(localStorage.getItem('movies'));
    if (!moviesLocal) {
      return moviesLocal = [];
    }
    return moviesLocal;
  }

  // Извлекаю статус чекбокса фильтрации по короткометражным фильмам из LocalStorage и возращую значение для обновления стейта isCheckBoxActive
  const extractCheckBoxStatus = () => {
    const userCheckBoxStatus = JSON.parse(localStorage.getItem('checkBox'))
    return userCheckBoxStatus ? userCheckBoxStatus : false;
  }

  const [movies, setMovies] = useState(extractMoviesLocal());

  const [moviesToRender, setMoviesToRender] = useState([]);
  const [moviesPerPage, setMoviesPerPage] = useState(12);
  const [keyWords, setKeyWords] = useState(localStorage.getItem('keyWords') ? localStorage.getItem('keyWords') : '' );
  const [isCheckBoxActive, setIsCheckBoxActive] = useState(extractCheckBoxStatus())

  const handleShowMoreMovies = (num) => {
    setMoviesPerPage(num)
  }

  // Обработка запроса на поиск фильма
  const handleMoviesRequest = () => {
    console.log(movies)
    if (movies.length < 1) {
      getMovies()
      .then(data => {
        setMovies(data);
      })
      .catch(err => console.log(err))
    }

  

  }



  // Обратботка нажатия на чекбокс для коротко метражных фильмов
  const handleCheckBoxClick = () => {
    setIsCheckBoxActive(!isCheckBoxActive);
  }

  // Сохранение в LocalStorage базы фильмов при изменении базы
  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  // Сохранение в LocalStorage ключевого слова для фильтрации при изменении ключевого слова
  useEffect(() => {
    localStorage.setItem('keyWords', keyWords);
  }, [keyWords]);

  // Сохранение в LocalStorage статус чекбокса фильтрации короткометражных фильмов
  useEffect(() => {
    localStorage.setItem('checkBox', isCheckBoxActive);
  }, [isCheckBoxActive]);


  useEffect(() => {
    setMoviesToRender(filterMovies(movies, keyWords, isCheckBoxActive));
  }, [keyWords, isCheckBoxActive])


  return (
    <div className='movies'>
      <SearchForm handleMoviesRequest={handleMoviesRequest} keyWords={keyWords} isCheckBoxActive={isCheckBoxActive} handleCheckBoxClick={handleCheckBoxClick} setKeyWords={setKeyWords} />

      <MoviesCardList movies={moviesToRender} handleShowMoreMovies={handleShowMoreMovies} moviesPerPage={moviesPerPage} />

    </div>
  )
}

export default Movies;
