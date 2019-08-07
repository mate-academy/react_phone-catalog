/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link, Route } from 'react-router-dom';
import queryString from 'query-string';

class SearchPanel extends Component {
  parsed = queryString.parse(this.props.location.search);

  constructor(props) {
    super(props);

    this.state = {};
  }

  handleSearch = (event) => {
    // event.preventDefault();

    this.parsed.query = event.target.value.toLowerCase().trim();
    this.props.handleSearchChange(this.parsed.query);
  };

  handleSort = (event) => {
    this.parsed.sort = event.target.value;
    this.props.handleSortChange(this.parsed.sort);
  };

  render() {
    // console.log(this.props.match);
    // console.log(this.props.location);
    // console.log(this.props.history);
    // console.log(this.parsed);

    return (
      <div className="search-panel">
        <input
          onChange={this.handleSearch}
          className="search-field"
          type="text"
          placeholder="type to search "

        />

        <select
          defaultValue={this.parsed.sort}
          onChange={this.handleSort}
          className="search-sort"
        >
          <option>sort type</option>
          <option value="alphabet">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </div>
    );
  }
}

SearchPanel.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  handleSortChange: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default SearchPanel;
