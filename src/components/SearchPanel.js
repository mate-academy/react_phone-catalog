import React from 'react';
import PropTypes from 'prop-types';

const SearchPanel = ({ handleSortChange, handleSearchChange }) => (
  <div className="search-panel">
    <input
      onChange={handleSearchChange}
      className="search-field"
      type="text"
      placeholder="type to search "
    />
    <select onChange={handleSortChange} className="search-sort">
      <option>sort type</option>
      <option value="alphabet">Alphabetical</option>
      <option value="age">Newest</option>
    </select>
  </div>
);

SearchPanel.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  handleSortChange: PropTypes.func.isRequired,
};

export default SearchPanel;
