import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState, useEffect } from 'react';
import filterMovies from '../../utils/FilterMovies';

const SavedMovies = ({ savedMovies, handleDeleteMovie }) => {
  const [flag] = useState('saved');
  const [keyWords, setKeyWords] = useState('');
  const [isCheckBoxActive, setIsCheckBoxActive] = useState(false);
  const [moviesToRender, setMoviesToRend] = useState(savedMovies);

  // Обратботка нажатия на чекбокс для коротко метражных фильмов
  const handleCheckBoxClick = () => {
    setIsCheckBoxActive(!isCheckBoxActive);
  }

   // Обработка запроса на поиск фильма
   const handleMoviesSearch = () => {
    console.log('none')
  }

  // Изменнение списка фильмов для рендеринга в зависимости от запроса и фильтров
  useEffect(() => {
    const moviesFiltered = filterMovies(savedMovies, keyWords, isCheckBoxActive)
    setMoviesToRend(moviesFiltered);
  }, [keyWords, isCheckBoxActive, savedMovies])

  return (
    <div className='savedmovies'>
      <SearchForm
        keyWords={keyWords}
        setKeyWords={setKeyWords}
        handleMoviesSearch={handleMoviesSearch}
        handleCheckBoxClick={handleCheckBoxClick}
        isCheckBoxActive={isCheckBoxActive}
      />
      {
        savedMovies.length === 0
        ?
        (<p className='savedmovies__empty-text'>Вы еще не сохранили не один фильм.</p>)
        :

        <MoviesCardList moviesToRender={moviesToRender} flag={flag} handleClick={handleDeleteMovie} />
      }
    </div>
  )
}

export default SavedMovies;
