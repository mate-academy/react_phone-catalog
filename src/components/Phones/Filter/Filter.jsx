import React from 'react';
import PropTypes from 'prop-types';
import './Filter.scss';

export const Filter = (props) => {
  const { handleInput, query, select, handleSelect } = props;

  return (
    <div className="filter">
      <form className="filter__search-form search-form">
        <label htmlFor="search-form" className="search-form__label">
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
      <form className="filter__sort sort">
        <label htmlFor="sort" className="sort__label">
          Sort by
          <select
            className="sort__select"
            id="sort"
            value={select}
            onChange={handleSelect}
          >
            <option value="default" className="sort__select-list">default</option>
            <option value="name" className="sort__select-list">Name</option>
            <option value="age" className="sort__select-list">Newest</option>
          </select>
        </label>
      </form>
    </div>
  );
};

Filter.propTypes = {
  handleInput: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  select: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
};
