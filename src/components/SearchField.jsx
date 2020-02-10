import React from 'react';

const SearchField = ({ handleChangeFilter, visiblePhones }) => (
  <div className="search_list">
    <input
      className="search_field"
      type="text"
      name="search-field"
      value={visiblePhones.name}
      onChange={handleChangeFilter}
      placeholder="Search phone"
    />
  </div>

);

export default SearchField;
