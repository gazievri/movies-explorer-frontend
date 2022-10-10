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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getMovies } from "../../utils/MoviesApi";
import { convertMovieData } from "../../utils/ConvertMovieData";
import { setStatusSaved } from "../../utils/setStatusSaved";
import PrivateRoutes from "../../utils/PrivateRoutes";
import OpenRoutes from '../../utils/OpenRoutes';
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
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("logIn")); // Отвечает за авторизацию
  const [isPopupOpened, setIsPopupOpned] = useState(false); // Отвечает за открытие попапа бургер меню
  const [isStatusPopupOpened, setIsStatusPopupOpened] = useState(false); // Отвечает за открытипе попапа с сообщением о результате
  const [errorMesage, setErrorMessage] = useState("");
  const [savedMovies, setSavedMovies] = useState([]);
  const [isPreloaderActive, setIsPreloaderActive] = useState(false);
  const [isDisabledEditProfile, setIsDisabledEditProfile] = useState(false);

  // Извлекаю базу фильмов из LocalStorage, проверяю на длинну и возращую значение для обновления стейта movies
  const extractAllMoviesLocal = () => {
    let allMoviesLocal = JSON.parse(localStorage.getItem("allMovies"));
    if (!allMoviesLocal) {
      return (allMoviesLocal = []);
    }
    return allMoviesLocal;
  };

  const [allMovies, setAllMovies] = useState(extractAllMoviesLocal());

  let navigate = useNavigate();

  // Запрос списка всех фильмов и проведение ниобходимых операций с ним
  const getAllMovies = () => {
    setIsPreloaderActive(true); // Включаем прелоадер
    getMovies()
      .then((res) => {
        let moviesList = res.map((item) => convertMovieData(item)); // форматирование полей
        moviesList = moviesList.map((item) =>
          setStatusSaved(item, savedMovies)
        ); // проверка на сохранение ранее
        setAllMovies(moviesList); // установка стейта
        localStorage.setItem("allMovies", JSON.stringify(moviesList)); // запись в LocalStorage
        setIsPreloaderActive(false); // Выключаем прелоадер
      })
      .catch((err) => {
        console.log(err)}
      );
  };

  // Обработка регистрации пользователя
  const handleSignup = (data) => {
    const { name, email, password } = data;
    signup(name, email, password)
      .then((res) => {
        if (res.name || res.email) {
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
          localStorage.setItem("logIn", true);
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
      .then((res) => {
        setIsLoggedIn(false);
        localStorage.clear();
        setAllMovies([]);
        setSavedMovies([]);
        setCurrentUser({});
        navigate("/");
        console.log(res);
      })
      .catch((err) => forceLogOutIfErr(err));
  };


  // Обработка обновления данных профиля
  const handleUpdateUserData = ({ name, email }) => {
    updateUserInfo(name, email)
      .then((res) => {
        setCurrentUser(res.data);
        setIsDisabledEditProfile(false);
        setIsStatusPopupOpened(true);
        setTimeout(() => {
          setIsStatusPopupOpened(false);
        }, 1000); // Закрываем попап статус через определеннео время
      })
      .catch((err) => {
        forceLogOutIfErr(err);
        setErrorMessage(err.response);
      });
  };

  // Обработка открытия попапа бургер меню
  const handlePopupOpen = () => {
    setIsPopupOpned(!isPopupOpened);
  };

  // Получение данных о текущем пользователе и сохранении их в currentUser
  const getUserData = () => {
    if (isLoggedIn) {
      getUserInfo()
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch(err => forceLogOutIfErr(err));
    }
  };

  const handleSaveMovie = (movie) => {
    // Проверяю есть сохраняемый фильм среди уже сохраненных чтобы исключить повторное сохранение фильма
    const isMovieSawedAllReady = savedMovies.some(
      (item) => item.movieId === movie.movieId
    );

    if (!isMovieSawedAllReady) {
      // Удаляю лишнее свойство saved из объекта для сохранения в mongoDb
      delete movie.saved;
      delete movie._id;
      // Отправляю фильм на сохранение в mongoDb
      saveMovie(movie)
        .then((res) => {
          // Сохраненный фильм сохраняю в массив сохраненных фильмов
          setSavedMovies([...savedMovies, res.data]);
          const updatedAllMovies = allMovies.map((el) =>
            el.movieId === res.data.movieId
              ? (el = { ...el, saved: true, _id: res.data._id })
              : el
          );
          setAllMovies(updatedAllMovies);
          localStorage.setItem("allMovies", JSON.stringify(updatedAllMovies));
        })
        .catch((err) => forceLogOutIfErr(err));
    }
  };

  const handleDeleteMovie = (movie) => {
    deleteMovie(movie._id)
      .then(() => {
        const newSavedMovies = savedMovies.filter(
          (item) => item._id !== movie._id
        );
        setSavedMovies(newSavedMovies);
        const updatedAllMovies = allMovies.map((el) =>
          el.movieId === movie.movieId ? (el = { ...el, saved: false }) : el
        );
        setAllMovies(updatedAllMovies);
        localStorage.setItem("allMovies", JSON.stringify(updatedAllMovies));
      })
      .catch((err) => forceLogOutIfErr(err));
  };

  // Отправяет данные на сервер, если ответ пришел и в нем есть id, то устанавливает статус LoggedIn и данные текущего пользователя
  const tokenCheck = () => {
    getUserInfo()
    .then((res) => {
      if (res.data._id) {
        setCurrentUser(res.data);
        setIsLoggedIn(true);
        localStorage.setItem("logIn", true);
      }
    })
    .catch(err => forceLogOutIfErr(err));
  };

  // Функция делает полный лог-аут в случае, если любой запрос к серверу заканчивается ошибкой авторизации
  const forceLogOutIfErr = (err) => {
    if (err.response === 'Authorization is needed') {
      setIsLoggedIn(false);
      localStorage.clear();
      setAllMovies([]);
      setSavedMovies([]);
      setCurrentUser({});
      setErrorMessage('');
      navigate("/");
      console.log(err, '&&&');
      setIsDisabledEditProfile(false);
    } else { return err}
  }


  // При загрузке страницы используем tokenCheck
  useEffect(() => {
    if (isLoggedIn) {
      tokenCheck();
    }
  }, [isLoggedIn]);

  // При загрузке страницы запрашивает список сохраненных фильмов
  useEffect(() => {
    if (isLoggedIn) {
      getSavedMovies()
        .then((data) => setSavedMovies(data.data))
        .catch((err) => {
          forceLogOutIfErr(err);
          console.log(err)
        });
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} handlePopupOpen={handlePopupOpen} />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route element={<PrivateRoutes isLoggedIn={isLoggedIn} />}>
              <Route
                element={
                  <Movies
                    handleSaveMovie={handleSaveMovie}
                    savedMovies={savedMovies}
                    handleDeleteMovie={handleDeleteMovie}
                    allMovies={allMovies}
                    getAllMovies={getAllMovies}
                    isPreloaderActive={isPreloaderActive}
                  />
                }
                path="/movies"
              />

              <Route
                element={
                  <SavedMovies
                    savedMovies={savedMovies}
                    handleDeleteMovie={handleDeleteMovie}
                  />
                }
                path="/saved-movies"
              />

              <Route
                element={
                  <Profile
                    handleLogout={handleLogout}
                    handleUpdateUserData={handleUpdateUserData}
                    errorMesage={errorMesage}
                    setErrorMessage={setErrorMessage}
                    isDisabledEditProfile={isDisabledEditProfile}
                    setIsDisabledEditProfile={setIsDisabledEditProfile}
                  />
                }
                path="/profile"
              />
              <Route path="/*" element={<PageNotFound />} />
            </Route>


            <Route element={<OpenRoutes isLoggedIn={isLoggedIn} />}>
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
            </Route>

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
