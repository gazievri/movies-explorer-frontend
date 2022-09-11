import './AboutProject.css';

const AboutProject = () => {
  return (
    <div className='aboutproject'>
      <h2 className='aboutproject__title'>О проекте</h2>
      <ul className='aboutproject__list'>
        <li className='aboutproject__item'>
          <h3 className='aboutproject__item-title'>Дипломный проект включал 5 этапов</h3>
          <p className='aboutproject__item-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className='aboutproject__item'>
          <h3 className='aboutproject__item-title'>На выполнение диплома ушло 5 недель</h3>
          <p className='aboutproject__item-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className='aboutproject__graph'>
        <div className='aboutproject__graph-first'>
          <p className='aboutproject__graph-first-text'>1 неделя</p>
          <p className='aboutproject__graph-first-span'>Back-end</p>
        </div>
        <div className='aboutproject__graph-second'>
          <p className='aboutproject__graph-second-text'>4 недели</p>
          <p className='aboutproject__graph-second-span'>Front-end</p>
        </div>
      </div>
    </div>
  )
}

export default AboutProject;
