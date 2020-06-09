import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
import './SelectSortPhones.scss';

import { OPTIONS_SORT_BY } from '../../helpers/config';

const SelectSortPhones: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy');
  const [dropdownOptionValue, setDropdownOptionValue] = useState<string>('');

  useEffect(() => {
    if (!sortBy) {
      setDropdownOptionValue('age');
    } else {
      setDropdownOptionValue(sortBy);
    }
  }, [sortBy]);

  const setSearchParams = (selectOptionValue: string) => {
    setDropdownOptionValue(selectOptionValue);
    searchParams.set('sortBy', selectOptionValue);
    history.push({ search: searchParams.toString() });
  };

  return (
    <div className="Phones__Dropdown--sortBy">
      <p className="Title">Sort By</p>
      <Dropdown
        options={OPTIONS_SORT_BY}
        value={dropdownOptionValue}
        onChange={(selectOptionValue) => (
          setSearchParams(selectOptionValue)
        )}
      />
    </div>
  );
};

export default SelectSortPhones;
