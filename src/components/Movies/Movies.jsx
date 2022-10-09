import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import filterMovies from '../../utils/FilterMovies';
import Preloader from '../Preloader/Preloader';

const Movies = ({ handleSaveMovie, savedMovies, handleDeleteMovie, allMovies, getAllMovies, isPreloaderActive  }) => {

  // Извлекаю статус чекбокса фильтрации по короткометражным фильмам из LocalStorage и возращую значение для обновления стейта isCheckBoxActive
  const extractCheckBoxStatus = () => {
    const userCheckBoxStatus = JSON.parse(localStorage.getItem('checkBox'))
    return userCheckBoxStatus ? userCheckBoxStatus : false;
  }

  // Извлекаю статус чекбокса фильтрации по короткометражным фильмам из LocalStorage и возращую значение для обновления стейта isCheckBoxActive
  const extractKeyWords = () => {
    const userKeyWords = localStorage.getItem('keyWords')
    return userKeyWords ? userKeyWords : '';
  }

  const [moviesToRender, setMoviesToRender] = useState([]);
  const [keyWords, setKeyWords] = useState(extractKeyWords());
  const [isCheckBoxActive, setIsCheckBoxActive] = useState(extractCheckBoxStatus());

  const [flag] = useState('movies')

  // Обработка запроса на поиск фильма
  const handleMoviesSearch = () => {
    console.log(allMovies.length)
    if (allMovies.length < 1) {
      getAllMovies();
    }
  }

  // Обратботка нажатия на чекбокс для коротко метражных фильмов
  const handleCheckBoxClick = () => {
    setIsCheckBoxActive(!isCheckBoxActive);
  }

  // Сохранение в LocalStorage статус чекбокса фильтрации короткометражных фильмов
  useEffect(() => {
    localStorage.setItem('checkBox', isCheckBoxActive);
  }, [isCheckBoxActive]);

  // Изменнение списка фильмов для рендеринга в зависимости от запроса и фильтров
  useEffect(() => {
    let filteredMovies = filterMovies(allMovies, keyWords, isCheckBoxActive)
    setMoviesToRender(filteredMovies);
  }, [keyWords, isCheckBoxActive, allMovies, savedMovies])

  // ОБработка на жатися на иконку сохраниить фильм (в зависимости от статуса фильма происходит разные действия)
  const handleClickSaveIcon = (data, isSaved) => {
    if (!isSaved) {
      handleSaveMovie(data)
    } else {
      const deletetMovie = savedMovies.filter(item => item.movieId === data.movieId)
      handleDeleteMovie(deletetMovie[0])
    }
  }

  // Сохраняет ключевое слово с LocalStorage каждай раз при его изменении
  useEffect(()=>{
    localStorage.setItem('keyWords', keyWords);
  }, [keyWords])

  return (
    <div className='movies'>
      <SearchForm
        handleMoviesSearch={handleMoviesSearch}
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
