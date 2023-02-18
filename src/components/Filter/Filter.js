// import PropTypes from 'prop-types'0-=09p-;
import css from './filter.module.css';

export const Filter = ({ value, onChange }) => {
  return (
    <input
      className={css.form__inputSearch}
      type="text"
      name="filter"
      value={value}
      onChange={onChange}
    />
  );
};
// Filter.prototype = {
//   value: PropTypes.string,
//   onChange: PropTypes.func,
// };
