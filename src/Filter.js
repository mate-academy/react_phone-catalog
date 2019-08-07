import React from 'react';
import './styles/filter.css';

const Filter = () => (
  <form className="phones-filter">
    <label htmlFor="filterBy">
      Search:
      <input
        placeholder="Searching..."
        id="filterBy"
        className="phones-filter__area"
      />
    </label>
    <label htmlFor="sortBy">
      Sort by:
      <select
        id="sortBy"
        className="phones-filter__area"
      >
        <option>Alphabetical</option>
        <option>Newest</option>
      </select>
    </label>
  </form>

);

export default Filter;
