import './App.css';
import '../../vendor/fonts/inter.css';
import Main from '../Main/Main';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return(
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  )
}

export default App;
