import css from './Button.module.css';
import clsx from 'clsx';
const Button = ({
  SearchFormButton,
  LoadMore,
  children,
  onClick,
  type,
}) => {
  const ButtonClasses = clsx(css.Button, {
    [css.LoadMore]: LoadMore,
    [css.SearchFormButton]: SearchFormButton,
  });
  return (
    <button
      type={type}
      className={ButtonClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
