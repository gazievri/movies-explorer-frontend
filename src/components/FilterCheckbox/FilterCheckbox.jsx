import './FilterCheckbox.css';
import { useState } from 'react';

const FilterCheckbox = () => {
  const [turnOn, setTurnOn] = useState(false)

  const toggleClick = () => {
    setTurnOn(!turnOn);
  }

  return (
    <div className='filtercheckbox'>
      <div className='filtercheckbox__handler'  onClick={toggleClick}>
        <div className={`filtercheckbox__handler-circle ${turnOn ? 'filtercheckbox__handler-circle_active' : ''}`}></div>
      </div>
      <p className='filtercheckbox__title'>Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox;
