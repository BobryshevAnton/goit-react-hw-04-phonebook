import React, { Component } from 'react';
import css from './modal.module.css';

export default class Modal extends Component {
  closeCallback = event => {
    const { toggleModal } = this.props;

    if (event.key === 'Escape') {
      toggleModal();
    }
  };

  handlerClickBackdrop = event => {
    const { toggleModal } = this.props;
    if (event.currentTarget === event.target) {
      toggleModal();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.closeCallback);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeCallback);
  }

  render() {
    return (
      <div className={css.modal__backdrop} onClick={this.handlerClickBackdrop}>
        <div className={css.modal__content}>{this.props.children}</div>
      </div>
    );
  }
}
