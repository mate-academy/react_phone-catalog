import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './Sort.scss';
import Dropdown from '../Dropdown/Dropdown';

const Sort: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy');
  const [dropdownValue, setDropdownValue] = useState<string>('');

  const SORT_OPTIONS = [
    { value: 'age', title: 'Newest' },
    { value: 'name', title: 'Alphabetically' },
    { value: 'price', title: 'Cheapest' },
  ];

  // const ITEMS_ON_PAGE = [4, 8, 18, 32];

  useEffect(() => {
    if (!sortBy) {
      setDropdownValue('name');
    } else {
      setDropdownValue(sortBy);
    }
  }, [sortBy]);

  const sortingBy = (selectValue: string) => {
    setDropdownValue(selectValue);
    searchParams.set('sortBy', selectValue);
    history.push({
      search: searchParams.toString(),
    });
  };

  return (
    <>

      <div className="Sort ">
        <p className="Sort__title ">Sort by </p>

        <Dropdown
          options={SORT_OPTIONS}
          value={dropdownValue}
          onChange={(selectValue: string) => (
            sortingBy(selectValue)
          )}
        />
      </div>


      {/* <div className="Sort">
        <div className="Sort__item">
          <p className="Sort__title">Sort by</p>
          <select
            className="Sort__select"
            onChange={(event) => sortingBy(event)}
          >

            {SORT_OPTIONS.map((option) => (
              <option
                value={option.value}
                className="Sort__option"
                key={option.value}
              >
                {option.title}
              </option>
            ))}
          </select>
        </div> */}
      {/* <div className="Sort__item">
          <p className="Sort__title">Items on page</p>
          <select className="Sort__select">
            {ITEMS_ON_PAGE.map(item => (
              <option
                value={item}
                className="Sort__option"
                key={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div> */}
      {/* </div> */}
    </>
  );
};

export default Sort;
