import { useEffect } from 'react';
import css from './modal.module.css';

export const Modal = ({ toggleModal, children }) => {
  const closeCallback = event => {
    if (event.key === 'Escape') {
      toggleModal();
    }
  };

  const handlerClickBackdrop = event => {
    if (event.currentTarget === event.target) {
      toggleModal();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', closeCallback);
  });

  return (
    <div className={css.modal__backdrop} onClick={handlerClickBackdrop}>
      <div className={css.modal__content}>{children}</div>
    </div>
  );
};
