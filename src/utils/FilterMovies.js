import { SHORT_MOVIES_LENGTH } from './constants.js';

const filterMovies = (movies, keyWords, isCheckBoxActive) => {
  let filteredMovies = movies;

  if (keyWords !== '') {
    filteredMovies = filteredMovies.filter(item => item.nameRU.toLowerCase().includes(keyWords.toLowerCase()))
  }

  if (isCheckBoxActive) {
    filteredMovies = filteredMovies.filter(item => item.duration <= SHORT_MOVIES_LENGTH);
  }
  console.log('!', movies.length, filteredMovies.length, keyWords, isCheckBoxActive)

  return filteredMovies
}

const filterMoviesCheckBox = (movies, isCheckBoxActive) => {
  let filteredMovies = movies;

  if (isCheckBoxActive) {
    filteredMovies = filteredMovies.filter(item => item.duration <= SHORT_MOVIES_LENGTH);
  }
  console.log('!!!', movies.length, filteredMovies.length, isCheckBoxActive)

  return filteredMovies
}



export { filterMovies, filterMoviesCheckBox };