import { useState } from 'react';
import { toast } from 'react-toastify';

import css from './Searchbar.module.css';
import Button from '../Button/Button';
export default function Searchbar({ handelSubmit }) {
  const [inputValue, setInputValue] = useState('');

  // оновлюєм стейт коли вводимо значення в інпут
  const handelInputChange = ({ currentTarget }) => {
    setInputValue(currentTarget.value);
  };
  // по сабміту форми відправляєм значеня в компонент App
  const handelFormSubmit = event => {
    event.preventDefault();
    if (inputValue === '') {
      return toast.error('empty value type something', {
        theme: 'dark',
      });
    }

    handelSubmit(inputValue);

    setInputValue('');
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handelFormSubmit} className={css.SearchForm}>
        <input
          value={inputValue}
          onChange={handelInputChange}
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <Button type="submit" SearchFormButton>
          <span className={css.Lable}>Search</span>
        </Button>
      </form>
    </header>
  );
}
