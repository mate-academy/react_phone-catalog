import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './filter.css';

const Filter = ({ history, searchValues }) => {
  const { pathname } = history.location;

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newsearchValues = { ...searchValues };

    if (value !== newsearchValues[name]) {
      newsearchValues[name] = value;

      const newSearch = Object.entries(newsearchValues)
        .filter(prop => prop[1] !== '')
        .map(prop => `${prop[0]}=${prop[1]}`);

      history.push(`${pathname}?${newSearch.join('&')}`);
    }
  };

  return (
    <div className="filter">
      <input
        className="filter__query"
        type="search"
        name="query"
        value={searchValues.query}
        onChange={e => handleChange(e)}
      />

      <select
        className="filter__sort"
        name="sort"
        value={searchValues.sort}
        onChange={e => handleChange(e)}
      >
        <option value="">Sort by</option>
        <option value="name*1">Name (a-z)</option>
        <option value="name*-1">Name (z-a)</option>
        <option value="age*1">Newest</option>
      </select>
    </div>
  );
};

Filter.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  searchValues: PropTypes.shape({
    query: PropTypes.string,
    sort: PropTypes.string,
  }).isRequired,
};

export default withRouter(Filter);
