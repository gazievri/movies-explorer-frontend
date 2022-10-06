import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import { useState, useEffect } from 'react';
import { getMovies } from '../../utils/MoviesApi';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import filterMovies from '../../utils/FilterMovies';
import Preloader from '../Preloader/Preloader';
import { convertMovieData } from '../../utils/ConvertMovieData';

const Movies = ({ handleSaveMovie, savedMovies, handleDeleteMovie, movieIsSaved }) => {

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
  const [keyWords, setKeyWords] = useState(localStorage.getItem('keyWords') ? localStorage.getItem('keyWords') : '' );
  const [isCheckBoxActive, setIsCheckBoxActive] = useState(extractCheckBoxStatus());
  const [isPreloaderActive, setIsPreloaderActive] = useState(false);
  const [flag] = useState('movies')

  // Обработка запроса на поиск фильма
  const handleMoviesRequest = () => {
    if (movies.length < 1) {
      setIsPreloaderActive(true);
      getMovies()
      .then(data => {
        setMovies(data.map(item => convertMovieData(item)));
        setIsPreloaderActive(false);
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

  // Изменнение списка фильмов для рендеринга в зависимости от запроса и фильтров
  useEffect(() => {
    let filteredMovies = filterMovies(movies, keyWords, isCheckBoxActive)

    setMoviesToRender(filteredMovies);
  }, [keyWords, isCheckBoxActive, movies, savedMovies])

  const handleClickSaveIcon = (data, isSaved) => {
    if (!isSaved) {

      handleSaveMovie(data)
    } else {
      const deletetMovie = savedMovies.filter(item => item.movieId === data.movieId)
      console.log(deletetMovie)
      handleDeleteMovie(deletetMovie[0])

    }
  }

  useEffect(() => {
    moviesToRender.map(movie => movie.movieId === movieIsSaved.movieId ? movieIsSaved : movie)
    console.log(movieIsSaved)
  }, [movieIsSaved, moviesToRender])

  console.log(movieIsSaved)
  console.log(moviesToRender)


  return (
    <div className='movies'>
      <SearchForm
        handleMoviesRequest={handleMoviesRequest}
        keyWords={keyWords}
        isCheckBoxActive={isCheckBoxActive}
        handleCheckBoxClick={handleCheckBoxClick}
        setKeyWords={setKeyWords} />
      {
        isPreloaderActive ? <Preloader /> :

      <MoviesCardList
        moviesToRender={moviesToRender}
        flag={flag}
        handleClick={handleClickSaveIcon} />

}
    </div>
  )
}

export default Movies;
