import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterBy, sortBy } from '../../redux/actions';
import './Filter.css';

class Filter extends React.Component {
  state = {
    inputValue: '',
    selectValue: '',
  };

  handleInputValue = (event) => {
    const { value } = event.target;
    const { filterByValue, sortByValue } = this.props;
    const { selectValue } = this.state;

    this.setState({ inputValue: value });
    filterByValue(value);
    sortByValue(selectValue);
  };

  handleSelect = (event) => {
    const { value } = event.target;
    const { sortByValue } = this.props;

    this.setState({ selectValue: value });

    sortByValue(value);
  }

  render() {
    const { inputValue, selectValue } = this.state;

    return (
      <div className="filter-wrap">
        <input
          className="field filter-field"
          placeholder="Search in phone catalog"
          value={inputValue}
          onChange={this.handleInputValue}
        />
        <select
          className="field sort-field"
          value={selectValue}
          onChange={this.handleSelect}
        >
          <option
            className="sort-field__option"
            disabled
            value=""
          >
            Sort by
          </option>
          <option className="sort-field__option" value="age">Newest</option>
          <option
            className="sort-field__option"
            value="alphabetical"
          >
            Alphabetical
          </option>
        </select>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  filterByValue: value => dispatch(filterBy(value)),
  sortByValue: value => dispatch(sortBy(value)),
});

Filter.propTypes = {
  filterByValue: PropTypes.func.isRequired,
  sortByValue: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Filter);
