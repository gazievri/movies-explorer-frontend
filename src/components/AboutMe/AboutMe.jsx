import './AboutMe.css';
import photo from '../../images/photo-ruslan-min.jpg';

const AboutMe = () => {
  return (
    <div className='aboutme' id='aboutme'>
      <h2 className='aboutme__title'>Студент</h2>
      <div className='aboutme__profile'>
        <div className='aboutme__textblock'>
          <h3 className='aboutme__name'>Руслан</h3>
          <p className='aboutme__info'>Фронтенд-разработчик, 39 лет</p>
          <p className='aboutme__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className='aboutme__githab' href='https://github.com/gazievri' target="_blank" rel="noreferrer">Github</a>
        </div>
        <img className='aboutme__photo' src={photo} alt='Портрет Руслана Газиева'/>
      </div>
    </div>
  )
}

export default AboutMe;
