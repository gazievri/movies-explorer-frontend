import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  return (
    <div className='searchfilm'>
      <input className='searchfilm__input' type='search' placeholder='Фильм'/>
      <button className='searchfilm__btn'>
        <div className='searchfilm__btn-icon'></div>
      </button>
      <FilterCheckbox />
    </div>
  )
}

export default SearchForm;
