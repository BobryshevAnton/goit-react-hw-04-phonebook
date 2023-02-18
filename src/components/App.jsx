import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
//
import Modal from './Modal/Modal';
//

import css from './app.module.css';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    showModal: false,
  };
  //
  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  //
  componentDidMount() {
    const contactsParsed = JSON.parse(localStorage.getItem('phoneBook'));
    if (contactsParsed) {
      this.setState({ contacts: contactsParsed });
    }
  }
  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('phoneBook', JSON.stringify(this.state.contacts));
    }
  }
  //

  onContactForm = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const inclCont = this.state.contacts.some(
      elem => elem.name === newContact.name
    );
    if (inclCont) {
      alert(`${newContact.name} already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  onFilterSearch = evt => {
    const { value } = evt.target;
    this.setState({ filter: value });
  };

  onDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(elem => elem.id !== id),
    }));
  };
  render() {
    const { contacts, filter, showModal } = this.state;
    const elemNormal = filter.toLowerCase();
    const visibleList = contacts.filter(elem =>
      elem.name.toLowerCase().includes(elemNormal)
    );

    return (
      <div className={css.form}>
        <button
          type="button"
          className={css.form__button}
          onClick={this.toggleModal}
        >
          Form for new contact
        </button>
        {showModal && (
          <Modal toggleModal={this.toggleModal}>
            <ContactForm
              onSubmit={this.onContactForm}
              onClose={this.toggleModal}
            />
          </Modal>
        )}
        {/* <ContactForm onSubmit={this.onContactForm} contactList={contacts} /> */}
        <h1 className={css.form__title}>Contacts:</h1>
        <h1 className={css.form__title}>Find contacts by name</h1>
        <Filter onChange={this.onFilterSearch} value={filter} />
        <ContactList
          contactsList={visibleList}
          onClick={this.onDeleteContact}
        />
      </div>
    );
  }
}

export default App;
