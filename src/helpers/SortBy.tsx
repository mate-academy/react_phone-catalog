import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './SortBy.scss';

const SortBy = () => {
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const sort: string = searchParams.get('sort') || 'age';

  return (
    <div className="select-for-sort">
      <span className="select-for-sort__text">Sort by</span>
      <img src="./img/ArrowRight.svg" alt="arrow" className="select-for-page__svg" />
      <select
        className="select-for-sort__options"
        value={sort}
        onChange={(event) => {
          const target = event.target as HTMLSelectElement;

          searchParams.set('sort', target.value);
          history.push({
            search: searchParams.toString(),
          });
        }}
      >
        <option value="age">Newest</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
    </div>
  );
};

export default SortBy;
