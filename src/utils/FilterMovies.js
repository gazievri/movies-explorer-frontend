const filterMovies = (movies, keyWords, isCheckBoxActive) => {

  let filteredMovies = movies.filter(item => item.nameRU.toLowerCase().includes(keyWords.toLowerCase()))

  if (isCheckBoxActive) {
    filteredMovies = filteredMovies.filter(item => item.duration <= 40);
  }
  console.log('!', movies.length, filteredMovies.length, keyWords, isCheckBoxActive)

  return filteredMovies
}

export default filterMovies;