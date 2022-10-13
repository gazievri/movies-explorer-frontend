import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState, useEffect } from 'react';
import { filterMovies } from '../../utils/FilterMovies';

const SavedMovies = ({ savedMovies, handleDeleteMovie }) => {
  const [flag] = useState('saved');
  const [keyWords, setKeyWords] = useState('');
  const [moviesToRender, setMoviesToRend] = useState(savedMovies);
  const [isCheckBoxActive, setIsCheckBoxActive] = useState(false);

  // Обработка запроса на поиск фильма
  const handleMoviesSearch = (data, isCheckBoxActive) => {
    setKeyWords(data);
    const moviesFiltered = filterMovies(savedMovies, data, isCheckBoxActive)
    setMoviesToRend(moviesFiltered);
  }

  useEffect(() => {
    const moviesFiltered = filterMovies(savedMovies, keyWords ,isCheckBoxActive)
    setMoviesToRend(moviesFiltered);
  }, [isCheckBoxActive])

  useEffect(() => {
    setMoviesToRend(savedMovies);
  }, [savedMovies])

  return (
    <div className='savedmovies'>
      <SearchForm
        keyWords={keyWords}
        setKeyWords={setKeyWords}
        handleMoviesSearch={handleMoviesSearch}
        setMoviesToRend={setMoviesToRend}
        isCheckBoxActive={isCheckBoxActive}
        setIsCheckBoxActive={setIsCheckBoxActive}
      />
      {
        savedMovies.length === 0
        ?
        (<p className='savedmovies__empty-text'>Вы еще не сохранили не один фильм.</p>)
        :

        <MoviesCardList moviesToRender={moviesToRender} flag={flag} handleClick={handleDeleteMovie} allMovies={['anytext']}/>
      }
    </div>
  )
}

export default SavedMovies;
