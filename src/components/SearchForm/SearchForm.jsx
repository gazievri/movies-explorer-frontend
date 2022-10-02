import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState } from 'react';

const SearchForm = ({ handleMoviesRequest, keyWords = '', isCheckBoxActive, handleCheckBoxClick, setKeyWords }) => {
  const [ isSpanActive, setIsSpanActive ] = useState(false);
  const searchBtn = document.querySelector('.searchfilm__btn');
  const [ text, setText ] = useState(keyWords)

  // Обработка сабмита формы
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      setKeyWords(text);
      handleMoviesRequest();
    } else {
      setIsSpanActive(true);
    }
  }

  // Обработка отправки формы по нажатию Enter
  const handleKeydown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  // Убирает текст ошибки как только в поле поиска что-то ввeли, обновляет стейт text
  const handleChange = (e) => {
    const value = e.target.value
    setText(value);
    if (value.length !== 0) {
      setIsSpanActive(false);
      searchBtn.removeAttribute("disabled", "disabled")
    } else {
      setIsSpanActive(true);
      searchBtn.setAttribute("disabled", "disabled")
    }
  }


  return (
    <form className='searchfilm' onSubmit={handleSubmit} noValidate onKeyDown={handleKeydown}>
      <input className='searchfilm__input' type='search' placeholder='Фильм' required onChange={handleChange} value={text} />
      <p className={`searchfilm__span ${ isSpanActive ? 'searchfilm__span_active' : ''}`} >Нужно ввести ключевое слово</p>
      <button className='searchfilm__btn' id='searchBtn' >
        <div className='searchfilm__btn-icon'></div>
      </button>
      <FilterCheckbox isCheckBoxActive={isCheckBoxActive} handleCheckBoxClick={handleCheckBoxClick} />
    </form>
  )
}

export default SearchForm;
