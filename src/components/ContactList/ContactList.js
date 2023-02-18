import css from './contactList.module.css';
import PropTypes from 'prop-types';
export const ContactList = ({ contactsList, onClick }) => {
  return (
    <ul className={css.contactList}>
      {contactsList.map(elem => (
        <li key={elem.id} className={css.contactItem}>
          &#8226;{elem.name}: {elem.number}
          <button
            type="button"
            className={css.contactButton}
            onClick={() => onClick(elem.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.prototype = {
  contactsList: PropTypes.array,
  onClick: PropTypes.func,
};
