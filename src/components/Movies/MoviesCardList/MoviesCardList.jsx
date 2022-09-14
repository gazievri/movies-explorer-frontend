import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({ movies, handleShowMoreMovies, moviesPerPage }) => {

  const handleClickMoreMovies = () => {
    handleShowMoreMovies(moviesPerPage + 12);
  }

  return (
    <div className='moviescardlist'>
      <div className='moviescardlist__container'>
        {!movies ? (<Preloader />) : movies.map(movie => <MoviesCard key={movie.id} movie={movie}/>)}
      </div>
      <button className='moviescardlist__btn' type='button' onClick={handleClickMoreMovies}>Ещё</button>
    </div>
  )
}

export default MoviesCardList;
