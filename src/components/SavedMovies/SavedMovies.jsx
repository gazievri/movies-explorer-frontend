import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({ movies }) => {

  return (
    <div className='savedmovies'>
      <SearchForm/>
      {
        !movies ? (<p className='savedmovies__empty-text'>Вы еще не сохранили не один фильм.</p>) :
        <MoviesCardList movies={movies} />
      }
    </div>
  )
}

export default SavedMovies;
