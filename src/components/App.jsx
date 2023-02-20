import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Modal } from './Modal/Modal';

import css from './app.module.css';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('phoneBook') ?? []);
  });
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  //
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    window.localStorage.setItem('phoneBook', JSON.stringify(contacts));
  }, [contacts]);

  const onContactForm = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const inclCont = contacts.some(elem => elem.name === newContact.name);
    if (inclCont) {
      alert(`${newContact.name} already in contacts`);
      return;
    }
    setContacts([newContact, ...contacts]);
  };

  const onFilterSearch = evt => {
    const { value } = evt.target;
    setFilter(value);
  };

  const onDeleteContact = id => {
    setContacts(contacts.filter(elem => elem.id !== id));
  };

  const elemNormal = filter.toLowerCase();
  const visibleList = contacts.filter(elem =>
    elem.name.toLowerCase().includes(elemNormal)
  );

  return (
    <div className={css.form}>
      <button type="button" className={css.form__button} onClick={toggleModal}>
        Form for new contact
      </button>
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <ContactForm onSubmit={onContactForm} onClose={toggleModal} />
        </Modal>
      )}
      <h1 className={css.form__title}>Contacts:</h1>
      <h1 className={css.form__title}>Find contacts by name</h1>
      <Filter onChange={onFilterSearch} value={filter} />
      <ContactList contactsList={visibleList} onClick={onDeleteContact} />
    </div>
  );
};

export default App;
