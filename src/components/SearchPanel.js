import React from 'react';

const SearchPanel = () => (
  <div className="search-panel">
    <label className="search-panel-text">Search: </label>
    <input className="search-field" type="text" placeholder="type to search " />

    <select className="search-sort">
      <option value="Alpabetical">Alpabetical</option>
      <option value="Newest">Newest</option>
    </select>
  </div>
);

export default SearchPanel;
