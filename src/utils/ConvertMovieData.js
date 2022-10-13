import { MOVIE_URL } from '../utils/constants';

// Меняет формат данных объекта movie чтобы они были единообразными (решение проблемы совместимости полученных данных и данных сохраняемых на бэкэ)
const convertMovieData = (movie) => {
  const convertedMovie = {
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: `${MOVIE_URL}${movie.image.url}`,
    trailerLink: movie.trailerLink,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
    thumbnail: `${MOVIE_URL}${movie.image.url}`,
    movieId: `${movie.id}`,
    saved: false,
  }

  return convertedMovie;
}

export { convertMovieData };