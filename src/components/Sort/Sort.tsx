import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './Sort.scss';

const Sort = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const SORT_OPTIONS = [
    { value: 'age', title: 'Newest' },
    { value: 'name', title: 'Alphabetically' },
    { value: 'price', title: 'Cheapest' },
  ];

  const ITEMS_ON_PAGE = [4, 8, 18, 32];

  const sortingBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sortBy', event.target.value);
    history.push({
      search: searchParams.toString(),
    });
  };

  return (
    <>
      <div className="Sort">
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
        </div>
        <div className="Sort__item">
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
        </div>
      </div>
    </>
  );
};

export default Sort;
