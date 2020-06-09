import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
import './SelectPerPage.scss';

const options = ['4', '8', '16', 'all'].map(item => (
  {
    value: item,
    title: item,
  }
));

const SelectPerPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const perPage = searchParams.get('perPage');
  const [dropdownOptionValue, setDropdownOptionValue] = useState<string>('');

  useEffect(() => {
    if (!perPage) {
      setDropdownOptionValue('all');
    } else {
      setDropdownOptionValue(perPage);
    }
  }, [perPage]);

  const setSearchParams = (selectOptionValue: string) => {
    setDropdownOptionValue(selectOptionValue);
    searchParams.set('page', '1');
    searchParams.set('perPage', selectOptionValue);
    history.push({ search: searchParams.toString() });
  };

  return (
    <div className="Phones__Dropdown--sortItemInPage">
      <p className="Title">Item on page</p>
      <Dropdown
        options={options}
        value={dropdownOptionValue}
        onChange={(selectOptionValue) => (
          setSearchParams(selectOptionValue)
        )}
      />
    </div>
  );
};

export default SelectPerPage;
