import React from 'react';

const SearchField = ({ handleChangeFilter, visipblePhones }) => (
  <div className="search_list">
    <input
      className="search_field"
      type="text"
      name="search-field"
      value={visipblePhones.name}
      onChange={handleChangeFilter}
      placeholder="Search"
    />
  </div>
);

export default SearchField;
