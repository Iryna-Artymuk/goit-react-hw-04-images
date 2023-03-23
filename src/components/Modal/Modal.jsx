import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

import { AiOutlineClose } from 'react-icons/ai';
import IconButton from '../IconButton/IconButton';
const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeOnESC);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeOnESC);
  }

  closeOnESC = event => {
    if (event.code === 'Escape') {
      this.props.toggleModal();
    }
  };
  closeOnBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    return createPortal(
      <div
        className={css.Overlay}
        onClick={this.closeOnBackdropClick}
      >
        <div className={css.Modal}>
          {this.props.children}

          <IconButton
            onClick={this.props.toggleModal}
            aria-label="close"
          >
            <AiOutlineClose />
          </IconButton>
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
