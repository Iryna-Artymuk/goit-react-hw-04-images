import css from './IconButton.module.css';
const IconButton = ({
  children,
  onClick,
  ...allyProps
}) => {
  return (
    <button
      className={css.Iconbutton}
      type="button"
      onClick={onClick}
      {...allyProps}
    >
      {children}
    </button>
  );
};

export default IconButton;
