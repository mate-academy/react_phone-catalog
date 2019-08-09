import React from 'react';

/* eslint-disable */
const Filter = ({ onFilterPhones, onSortPhonesBy}) => (
  <form>
    <div className="inputs-field indent-mb-m">
      <div className="input-block">
        <label htmlFor="input-filter">Search:</label>
        <input id="input-filter" onChange={onFilterPhones} />
      </div>
      <div className="input-block">
        <label htmlFor="select-sort">Sort by: </label>
        <select id="select-sort" onChange={onSortPhonesBy}>
          <option value="age">Newest</option>
          <option value="name">Alphabetical</option>
        </select>
      </div>
    </div>
  </form>
);

export default Filter;
