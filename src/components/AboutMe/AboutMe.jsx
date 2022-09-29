import './AboutMe.css';
import photo from '../../images/photo-ruslan-min.jpg';

const AboutMe = () => {
  return (
    <section className='aboutme' id='aboutme'>
      <h2 className='aboutme__title'>Студент</h2>
      <div className='aboutme__profile'>
        <div className='aboutme__textblock'>
          <h3 className='aboutme__name'>Руслан</h3>
          <p className='aboutme__info'>Фронтенд-разработчик, 39 лет</p>
          <p className='aboutme__text'>Я живу и работаю в Москве. Более 20 лет я занимался продажами в сервисной ИТ-компании. Год назад принял решение заняться веб-разработкой, чтобы мое любимое хобби превратилось в дело всей моей жизни! Мне кажется это очень важным! А еще я увлекаюсь бегом (на моем счету пару марафонов), плаванием и очень люблю собак. </p>
          <a className='aboutme__githab' href='https://github.com/gazievri' target="_blank" rel="noreferrer">Github</a>
        </div>
        <img className='aboutme__photo' src={photo} alt='Портрет Руслана Газиева'/>
      </div>
    </section>
  )
}

export default AboutMe;
