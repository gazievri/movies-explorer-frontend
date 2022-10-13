import { MAIN_API } from "../utils/constants";

export const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    return response.json().then((result) => {
      let error = new Error(`Ошибка ${response.status}`);
      error.response = result.message;
      throw error;
    });
  }
};

export const signup = (name, email, password) => {
  return fetch(`${MAIN_API}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);
};

export const login = (email, password) => {
  return fetch(`${MAIN_API}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const getUserInfo = () => {
  return fetch(`${MAIN_API}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },

  }).then(checkResponse);
};

export const updateUserInfo = (name, email) => {
  return fetch(`${MAIN_API}/users/me`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),

  }).then(checkResponse);
};

export const logout = () => {
  return fetch(`${MAIN_API}/signout`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(checkResponse);
}

export const saveMovie = (movieData) => {
  return fetch(`${MAIN_API}/movies`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(movieData),
  })
  .then(checkResponse);
}

export const getSavedMovies = () => {
  return fetch(`${MAIN_API}/movies`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(checkResponse);
}

export const deleteMovie = (id) => {
  return fetch(`${MAIN_API}/movies/${id}`, {
    method: "DELETE",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(checkResponse);
}