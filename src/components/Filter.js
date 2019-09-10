import React, { useEffect, useState } from 'react';
import useDebounce from '../helpers/useDebounce';

/* eslint-disable */
const Filter = ({ onFilterPhones, onSortPhonesBy, sortValue, searchValue}) => {
  const [value, setValue] = useState(searchValue);

  const debouncedValue = useDebounce(value, 1000);

  useEffect(
    () => {
      onFilterPhones(debouncedValue);
    },
    [debouncedValue]
  );

  return (
    <form>
      <div className="inputs-field indent-mb-m">
        <div className="input-block">
          <label htmlFor="input-filter">Search:</label>
          <input id="input-filter" onChange={e => setValue(e.target.value)} value={value}/>
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
  )
};

export default React.memo(Filter);
