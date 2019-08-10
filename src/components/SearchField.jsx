import React from 'react'

const SearchField = ({ handleChangeFilter }) => (
  <div className="search_list">
    <input
      className="search_field"
      type="text"
      onChange={handleChangeFilter}
      placeholder="Search"
    />
  </div>
)

export default SearchField
