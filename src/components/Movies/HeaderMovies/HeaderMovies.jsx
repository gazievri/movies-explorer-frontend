import './HeaderMovies.css';
import Logo from '../../Logo/Logo';

const HeaderMovies = () => {
  return (
    <div className='headermovies'>
      <Logo />
      <nav className='headermovies__nav'>
        <p className='headermovies__nav-item'>Фильмы</p>
        <p className='headermovies__nav-item'>Сохранённые фильмы</p>
      </nav>
      <div className='headermovies__accountblock'>
        <p className='headermovies__accountblock-text'>Аккаунт</p>
        <div className='headermovies__accountblock-icon'></div>
      </div>
  </div>
  )
}

export default HeaderMovies;