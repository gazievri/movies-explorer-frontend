import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://voluble-licorice-735839.netlify.app/' target='_blank' rel="noreferrer">Статичный сайт</a>
          <div className='portfolio__icon'></div>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://animated-kleicha-b05262.netlify.app/' target='_blank' rel="noreferrer">Адаптивный сайт</a>
          <div className='portfolio__icon'></div>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://gazievri.mesto.nomoredomains.sbs/' target='_blank' rel="noreferrer">Одностраничное приложение</a>
          <div className='portfolio__icon'></div>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
