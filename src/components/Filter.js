import React from 'react';

/* eslint-disable */
const Filter = ({ onFilterPhones, onSortPhonesBy, sortValue, searchValue}) => (
  <form>
    <div className="inputs-field indent-mb-m">
      <div className="input-block">
        <label htmlFor="input-filter">Search:</label>
        <input id="input-filter" onChange={onFilterPhones} value={searchValue}/>
      </div>
      <div className="input-block">
        <label htmlFor="select-sort">Sort by: </label>
        <select id="select-sort" onChange={onSortPhonesBy} value={sortValue}>
          <option value="age">Newest</option>
          <option value="name">Alphabetical</option>
        </select>
      </div>
    </div>
  </form>
);

export default Filter;
