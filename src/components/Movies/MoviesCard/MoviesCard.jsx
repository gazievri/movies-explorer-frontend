import './MoviesCard.css';
import { MOVIE_URL } from '../../../utils/constants';
import { useState } from 'react';

const MoviesCard = ({ movie }) => {
  const {nameRU, duration, image } = movie;
  const url = image.formats.thumbnail.url;
  const [isSaved, setIsSaved] = useState(false);

  const getTimeFromMins = (duration) => {
    let hours = Math.trunc(duration/60);
    let minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  };


  const handleClickSaveMovie = () => {
    setIsSaved(!isSaved);
  }

  return (
    <div className='moviescard'>
      <div className='moviescard__header'>
        <div className='moviescard__textblock'>
          <h4 className='moviescard__title'>{nameRU}</h4>
          <p className='moviescard__duration'>{getTimeFromMins(duration)}</p>
        </div>
        <div className={`moviescard__icon ${isSaved ? 'moviescard__icon_active ': ''}`} onClick={handleClickSaveMovie}></div>
      </div>
      <img className='moviescard__image' src={`${MOVIE_URL}${url}`} alt={nameRU}/>
    </div>
  )
}

export default MoviesCard;
