import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useDebounce } from '../../helpers';

import './styles.css';

const Filter = ({
  onFilterPhones, onSortPhonesBy, sortValue, searchValue,
}) => {
  const [value, setValue] = useState(searchValue);

  const debouncedValue = useDebounce(value, 1000);

  useEffect(
    () => {
      onFilterPhones(debouncedValue);
    },
    [debouncedValue]
  );
  /* eslint-disable*/
  return (
    <form>
      <div className="inputs-field indent-mb-m">
        <div className="input-block">

          <label htmlFor="input-filter">Search:</label>
          <input
            id="input-filter"
            onChange={e => setValue(e.target.value)}
            value={value}
          />
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
};

Filter.propTypes = {
  onFilterPhones: PropTypes.func.isRequired,
  onSortPhonesBy: PropTypes.func.isRequired,
  sortValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  searchValue: PropTypes.string.isRequired,
};

export default React.memo(Filter);
