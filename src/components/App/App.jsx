import "./App.css";
import "../../vendor/fonts/inter.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import StatusPopup from "../StatusPopup/StatusPopup";
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BurgerPopup from "../BurgerPopup/BurgerPopup";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  signup,
  login,
  logout,
  getUserInfo,
  saveMovie,
  getSavedMovies,
  deleteMovie,
  updateUserInfo,
} from "../../utils/MainApi";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Отвечает за авторизацию
  const [isPopupOpened, setIsPopupOpned] = useState(false); // Отвечает за открытие попапа бургер меню
  const [isStatusPopupOpened, setIsStatusPopupOpened] = useState(false); // Отвечает за открытипе попапа с сообщением о результате
  const [errorMesage, setErrorMessage] = useState("");
  const [savedMovies, setSavedMovies] = useState([]);
  const [movieIsSaved, setMovieIsSaved] = useState([])

  const [isDisabledEditProfile, setIsDisabledEditProfile] = useState(false);

  let navigate = useNavigate();

  // Обработка регистрации пользователя
  const handleSignup = (data) => {
    const { name, email, password } = data;
    signup(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin(data);
        }
      })
      .catch((err) => {
        setErrorMessage(err.response);
      });
  };

  // Обработка авторизации
  const handleLogin = (data) => {
    const { email, password } = data;
    login(email, password)
      .then((data) => {
        if (data.message === "Athorization successful") {
          setIsLoggedIn(true);
          getUserData();
          navigate("/movies");
        }
      })
      .catch((err) => {
        setErrorMessage(err.response);
      });
  };

  // Обработка де-авторизации
  const handleLogout = () => {
    logout()
      .then(() => {
        setIsLoggedIn(false);
        navigate("/");
        localStorage.clear();
      })
      .catch((err) => console.log(err));
  };

  // Обработка обновления данных профиля
  const handleUpdateUserData = ({name, email}) => {
    updateUserInfo(name, email)
    .then(res => {
      setCurrentUser(res.data);
      setIsDisabledEditProfile(false);
    })
    .catch(err => setErrorMessage(err.response))
  }


  // Обработка открытия попапа бургер меню
  const handlePopupOpen = () => {
    setIsPopupOpned(!isPopupOpened);
  };

  // Получение данных о текущем пользователе и сохранении их в currentUser
  const getUserData = () => {
    if (isLoggedIn) {
      getUserInfo().then((res) => {
        setCurrentUser(res.data);
      });
    }
  };

  const handleSaveMovie = (movie) => {
    // Проверяю есть сохраняемый фильм среди уже сохраненных чтобы исключить повторное сохранение фильма
    const isMovieSawedAllReady = savedMovies.some(item => item.movieId === movie.movieId);
    if (!isMovieSawedAllReady) {
      saveMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, res.data])
        setMovieIsSaved(res.data)
      })
      .catch((err) => console.log(err));
    }
  };

  const handleDeleteMovie = (movie) => {
    deleteMovie(movie._id)
      .then(() => {
        const newSavedMovies = savedMovies.filter(
          (item) => item._id !== movie._id
        );
        setSavedMovies(newSavedMovies);
      })
      .catch((err) => console.log(err));
  };

  // Отправяет данные на сервер, если ответ пришел и в нем есть id, то устанавливает статус LoggedIn и данные текущего пользователя
  const tokenCheck = () => {
    getUserInfo().then((res) => {
      if (res.data._id) {
        setCurrentUser(res.data);
        setIsLoggedIn(true);
      }
    });
  };

  // При загрузке страницы используем tokenCheck
  useEffect(() => {
    tokenCheck();
  }, []);


  // При загрузке страницы запрашивает список сохраненных фильмов
  useEffect(() => {
    getSavedMovies()
      .then((data) => setSavedMovies(data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} handlePopupOpen={handlePopupOpen} />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <Movies
                  handleSaveMovie={handleSaveMovie}
                  savedMovies={savedMovies}
                  handleDeleteMovie={handleDeleteMovie}
                  movieIsSaved={movieIsSaved}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <SavedMovies
                  savedMovies={savedMovies}
                  handleDeleteMovie={handleDeleteMovie}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  handleSignup={handleSignup}
                  errorMesage={errorMesage}
                  setErrorMessage={setErrorMessage}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  handleLogin={handleLogin}
                  errorMesage={errorMesage}
                  setErrorMessage={setErrorMessage}
                />
              }
            />
            <Route
              path="/profile"
              element={<Profile handleLogout={handleLogout} handleUpdateUserData={handleUpdateUserData} errorMesage={errorMesage} setErrorMessage={setErrorMessage} isDisabledEditProfile={isDisabledEditProfile} setIsDisabledEditProfile={setIsDisabledEditProfile} />}
            />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
        <StatusPopup
          isLoggedIn={isLoggedIn}
          isStatusPopupOpened={isStatusPopupOpened}
        />
        <BurgerPopup
          isPopupOpened={isPopupOpened}
          handlePopupOpen={handlePopupOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
