import './App.css';
import '../../vendor/fonts/inter.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return(
    <BrowserRouter>
    <div className='app'>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  )
}

export default App;
