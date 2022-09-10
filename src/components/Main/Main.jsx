import './Main.css';
import Header from '../Header/Header';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';

import AboutMe from './AboutMe/AboutMe';

import Footer from '../Footer/Footer';

const Main = () => {
  return(
    <div className='main'>
      <Header />
      <Promo />
      <NavTab />
      <AboutProject />
      <AboutMe />
      <Footer />
    </div>
  )
}

export default Main;