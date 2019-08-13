import React from 'react';
import PropTypes from 'prop-types';

const Filters = ({ filterValue, handleFilter }) => (
  <div className="filter">
    <div className="filter__input-wrapper">
      <input
        type="text"
        id="filter-input"
        className="filter__input"
        value={filterValue}
        onChange={handleFilter}
        placeholder="Search: "
      />
    </div>
  </div>
);

Filters.propTypes = {
  filterValue: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default Filters;
