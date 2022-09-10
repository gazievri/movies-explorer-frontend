import './AboutMe.css';
import photo from '../../../images/photo-ruslan-min.jpg';

const AboutMe = () => {
  return (
    <div className='aboutme'>
      <h2 className='aboutme__title'>Студент</h2>
      <div className='aboutme__profile'>
        <div></div>
        <img className='aboutme__photo' src={photo} alt='Портрет Руслана Газиева'/>
      </div>
    </div>
  )
}

export default AboutMe;
