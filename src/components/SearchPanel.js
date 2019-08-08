import React from 'react';
import PropTypes from 'prop-types';

const SearchPanel = (props) => {
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase().trim();

    props.handleSearchChange(value);
  };

  const handleSort = (event) => {
    const { value } = event.target;

    props.handleSortChange(value);
  };

  return (
    <div className="search-panel">
      <input
        onChange={handleSearch}
        className="search-field"
        type="text"
        placeholder="type to search "
      />
      <select
        onChange={handleSort}
        className="search-sort"
      >
        <option>sort type</option>
        <option value="alphabet">Alphabetical</option>
        <option value="age">Newest</option>
      </select>
    </div>
  );
};

SearchPanel.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  handleSortChange: PropTypes.func.isRequired,
};

export default SearchPanel;
