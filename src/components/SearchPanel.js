import React from 'react';
import PropTypes from 'prop-types';

const SearchPanel = ({ getSortType, getSearchValue }) => (
  <div className="search-panel">
    <input
      onChange={getSearchValue}
      className="search-field"
      type="text"
      placeholder="type to search "
    />
    <select onChange={getSortType} className="search-sort">
      <option value="">sort type</option>
      <option value="alphabet">Alphabetical</option>
      <option value="age">Newest</option>
    </select>
  </div>
);

SearchPanel.propTypes = {
  getSearchValue: PropTypes.func.isRequired,
  getSortType: PropTypes.func.isRequired,
};

export default SearchPanel;
