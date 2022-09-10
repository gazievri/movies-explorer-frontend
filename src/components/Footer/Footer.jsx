import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <p className='footer__subtitle'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__info'>
        <p className="footer__copyright">{`© ${new Date().getFullYear()}`}</p>
        <ul className='footer__list'>
          <li className='footer__item'>Яндекс.Практикум</li>
          <li className='footer__item'>Github</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer;
