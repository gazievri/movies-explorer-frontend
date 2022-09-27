import './App.css';
import '../../vendor/fonts/inter.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import StatusPopup from '../StatusPopup/StatusPopup';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { SAVED_MOVIE } from '../../utils/constants';
import { useEffect } from 'react';
import BurgerPopup from '../BurgerPopup/BurgerPopup';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPopupOpened, setIsPopupOpned] = useState(false);

  const movies = [SAVED_MOVIE]

  let navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/');
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  }

  //Обработка открытия попапа бургер меню
  const handlePopupOpen = () => {
    setIsPopupOpned(!isPopupOpened)
  }


  return(
    <div className='app'>
      <Header isLoggedIn={isLoggedIn} handlePopupOpen={handlePopupOpen} />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies movies={movies} />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login handleLogin={handleLogin} />} />
        <Route path='/profile' element={<Profile handleLogout={handleLogout} />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
      <Footer />
      <StatusPopup />
      <BurgerPopup isPopupOpened={isPopupOpened} handlePopupOpen={handlePopupOpen } />
    </div>
  )
}

export default App;
