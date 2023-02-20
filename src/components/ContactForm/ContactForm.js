import { useState } from 'react';
import css from './contactForm.module.css';

import { nanoid } from 'nanoid';

export const ContactForm = ({ onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameId = nanoid();
  const numberId = nanoid();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
      return;
    } else if (name === 'number') {
      setNumber(value);
      return;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit({ name, number });
    onClose();
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={css.form__label} htmlFor={nameId}>
        Name
        <input
          className={css.form__input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
          id={nameId}
        />
      </label>
      <label className={css.form__label} htmlFor={numberId}>
        Number
        <input
          className={css.form__input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
          id={numberId}
        />
      </label>

      <button type="submit" className={css.form__button}>
        Add contact: {name}
      </button>
    </form>
  );
};
