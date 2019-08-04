/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

const SearchPanel = (props) => {
  const handleSearch = (event) => {
    props.handleSearchChange(event);
  };

  const handleSort = (event) => {
    props.handleSortChange(event);
  };

  return (
    <div className="search-panel">
      <label className="search-panel-text">Search:</label>
      <input
        onChange={handleSearch}
        className="search-field"
        type="text"
        placeholder="type to search "
      />

      <select onChange={handleSort} className="search-sort">
        <option defaultValue>sort type ⮁</option>
        <option value="Alphabetical">Alphabetical</option>
        <option value="Newest">Newest</option>
      </select>
    </div>
  );
};

SearchPanel.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  handleSortChange: PropTypes.func.isRequired,
};

export default SearchPanel;
