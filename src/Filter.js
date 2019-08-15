import React from 'react';
import propTypes from 'prop-types';
import './styles/filter.css';

const Filter = ({
  filterStr,
  onHandlerFilter,
  clearFilter,
  onHandlerSort,
  onCLickEnter,
}) => (
  <form className="phones-filter">
    <div className="phones-filter__row">
      <label htmlFor="filterBy">
        Search:
        <input
          type="text"
          name="filter"
          placeholder="Searching..."
          id="filterBy"
          className="phones-filter__area"
          value={filterStr}
          onChange={onHandlerFilter}
          onKeyDown={onCLickEnter}
        />
        <button
          className={filterStr
            ? 'search-post__clear'
            : 'invisible'
          }
          onClick={clearFilter}
          type="button"
        >
          X
        </button>
      </label>
    </div>

    <div className="phones-filter__row">
        Sort by:
      <select
        id="sortBy"
        name="sortBy"
        className="phones-filter__area"
        onChange={onHandlerSort}
      >
        <option value="newest">Newest</option>
        <option value="alpha">Alphabetical</option>
      </select>
    </div>
  </form>
);

Filter.propTypes = {
  filterStr: propTypes.string.isRequired,
  onHandlerFilter: propTypes.func.isRequired,
  clearFilter: propTypes.func.isRequired,
  onHandlerSort: propTypes.func.isRequired,
  onCLickEnter: propTypes.func.isRequired,
};

export default Filter;
