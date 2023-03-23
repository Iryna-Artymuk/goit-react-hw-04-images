import { useEffect } from 'react';
// import { createPortal } from 'react-dom';
import css from './Modal.module.css';

import { AiOutlineClose } from 'react-icons/ai';
import IconButton from '../IconButton/IconButton';
// const modalRoot = document.querySelector('#modal-root');
export default function Modal({ toggleModal, children }) {
  const closeOnBackdropClick = event => {
    console.log(event.target === event.currentTarget);
    if (event.target === event.currentTarget) toggleModal();
  };

  useEffect(() => {
    const handleEscKeyDown = event => {
      if (event.code === 'Escape') toggleModal();
    };
    window.addEventListener('keydown', handleEscKeyDown);
    return () => {
      window.removeEventListener('keydown', handleEscKeyDown);
    };
  }, [toggleModal]);

  // useEffect(() => {
  //   const closeOnESC = event => {
  //     console.log(event.code);
  //     if (event.code === 'Escape') {
  //       return toggleModal();
  //     }
  //   };
  //   window.addEventListener('keydown', closeOnESC);

  //   return window.removeEventListener('keydown', closeOnESC);
  // }, [toggleModal]);

  // componentDidMount() {
  //   window.addEventListener('keydown', this.closeOnESC);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.closeOnESC);
  // }

  return (
    <div className={css.Overlay} onClick={closeOnBackdropClick}>
      <div className={css.Modal}>
        {children}

        <IconButton onClick={toggleModal} aria-label="close">
          <AiOutlineClose />
        </IconButton>
      </div>
    </div>
  );
}
