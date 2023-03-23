import { Component } from 'react';
import { toast } from 'react-toastify';

import css from './Searchbar.module.css';
import Button from '../Button/Button';
class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  // оновлюєм стейт коли вводимо значення в інпут
  handelInputChange = ({ currentTarget }) => {
    this.setState({
      inputValue: currentTarget.value,
    });
  };
  // по сабміту форми відправляєм значеня в компонент App
  handelFormSubmit = event => {
    event.preventDefault();
    if (this.state.inputValue === '') {
      return toast.error('empty value type something', {
        theme: 'dark',
      });
    }

    this.props.handelSubmit(this.state.inputValue);

    this.setState({ inputValue: '' });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form
          onSubmit={this.handelFormSubmit}
          className={css.SearchForm}
        >
          <input
            value={this.state.inputValue}
            onChange={this.handelInputChange}
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
}

export default Searchbar;
