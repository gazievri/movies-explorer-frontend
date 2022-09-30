import { MOVIE_URL } from '../utils/constants'

export function checkResponse(response) {
  return response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)
}

export const getMovies = () => {
  return fetch (`${MOVIE_URL}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(checkResponse)
}