import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState, useEffect } from 'react';

const SavedMovies = ({ savedMovies, handleDeleteMovie }) => {
  const [flag] = useState('saved');

  return (
    <div className='savedmovies'>
      <SearchForm />
      {
        savedMovies.length === 0 ? (<p className='savedmovies__empty-text'>Вы еще не сохранили не один фильм.</p>) :
        <MoviesCardList moviesToRender={savedMovies} flag={flag} handleClick={handleDeleteMovie} />
      }
    </div>
  )
}

export default SavedMovies;
