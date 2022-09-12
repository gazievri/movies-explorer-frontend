import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <p className='footer__subtitle'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__info'>
        <p className="footer__copyright">{`© ${new Date().getFullYear()}`}</p>
        <ul className='footer__list'>
          <li className='footer__item'>
            <a className='footer_link' href='https://practicum.yandex.ru/' target='_blank' rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li className='footer__item'>
            <a className='footer_link' href='https://github.com/gazievri' target='_blank' rel="noreferrer">Github</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer;
