import React from 'react';
import PropTypes from 'prop-types';
import './Filter.scss';

export const Filter = (props) => {
  const { handleInput, query } = props;

  return (
    <div className="filter">
      <form className="filter__search-form search-form">
        <label htmlFor="search-form">
          Search
          <input
            type="text"
            className="search-form__input"
            value={query}
            onChange={handleInput}
            id="search-form"
          />
        </label>
      </form>
    </div>
  );
};

Filter.propTypes = {
  handleInput: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};
