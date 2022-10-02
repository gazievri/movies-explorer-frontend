import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import { useState, useEffect } from 'react';
import { getMovies } from '../../utils/MoviesApi';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import filterMovies from '../../utils/FilterMovies';
import Preloader from '../Preloader/Preloader';

const Movies = () => {

  const [screenWidth, setScreenWidth] = useState(window.screen.width)
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
  const [moviesPerPage, setMoviesPerPage] = useState(12);
  const [moviesAddToPage, setMoviesAddToPage] = useState(3);



  // Определение ширины экрана и установление количества отображемых фильмов на страинце и количества добавляемых фильмов при нажатие клавиши Еще
  const checkWindowWidth = () => {
    const screenWidth = window.screen.width;

    if (screenWidth >= 1280 ) {
      setMoviesPerPage(12);
      setMoviesAddToPage(3);
      console.log(12)
    } else if (screenWidth < 1280 && screenWidth > 761) {
      setMoviesPerPage(8);
      setMoviesAddToPage(2);
      console.log(8)
    } else {
      setMoviesPerPage(5);
      setMoviesAddToPage(2);
      console.log(5)
    }
  }

  // Слидит за размерами экрана и запускат функцию checkWindowWidth с задержкой
  window.onresize = (event) => {
    setTimeout(checkWindowWidth, 50);
  };

  // Обработка запроса на поиск фильма
  const handleMoviesRequest = () => {
    setMoviesPerPage(12);
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

  // Изменнение списка фильмов для рендеринга в зависимости от запроса и фильтров
  useEffect(() => {
    const filteredMovies = filterMovies(movies, keyWords, isCheckBoxActive)
    setMoviesToRender(filteredMovies);
  }, [keyWords, isCheckBoxActive, movies])


console.log('moviesToRender)', moviesToRender);

  return (
    <div className='movies'>
      <SearchForm handleMoviesRequest={handleMoviesRequest} keyWords={keyWords} isCheckBoxActive={isCheckBoxActive} handleCheckBoxClick={handleCheckBoxClick} setKeyWords={setKeyWords} />
      {
        movies.length === 0 ? <Preloader /> :

      <MoviesCardList moviesToRender={moviesToRender} moviesPerPage={moviesPerPage} moviesAddToPage={moviesAddToPage} setMoviesPerPage={setMoviesPerPage} />

}
    </div>
  )
}

export default Movies;
