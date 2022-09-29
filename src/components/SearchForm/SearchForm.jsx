import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  return (
    <form className='searchfilm'>
      <input className='searchfilm__input' type='search' placeholder='Фильм' required />
      <button className='searchfilm__btn'>
        <div className='searchfilm__btn-icon'></div>
      </button>
      <FilterCheckbox />
    </form>
  )
}

export default SearchForm;
