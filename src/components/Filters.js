import React from 'react';
import PropTypes from 'prop-types';

const Filters = ({
  filterValue,
  handleFilter,
  getSortedPhones,

}) => (
  <div className="filter">
    <div>
      <label htmlFor="filter-input">
        Search:
        <input
          type="text"
          id="filter-input"
          className="filter__input"
          value={filterValue}
          onChange={handleFilter}
        />
      </label>
    </div>

    <div className="filter__selector">
      <label htmlFor="sort-field">
        Sort by:
        <select
          id="sort-field"
          name="sort-field"
          className="filter__selector-sorting"
          onChange={getSortedPhones}
        >
          <option value="age">
            Newest
          </option>

          <option value="alphabet">
            Alphabetical
          </option>
        </select>
      </label>
    </div>
  </div>
);

Filters.propTypes = {
  filterValue: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
  getSortedPhones: PropTypes.func.isRequired,
};

export default Filters;
