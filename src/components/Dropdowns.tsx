import React from 'react';
import '../styles/Dropdowns.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const Dropdowns: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { sort: e.target.value }),
    );
  };

  return (
    <section className="dropdowns">
      <div className="dropdown">
        <p className="dropdown__title">
          Sort by
        </p>

        <select
          value={sort}
          className="dropdown__select"
          onChange={handleSortByChange}
        >
          <option value="age">Newest</option>
          <option value="name">Alphabetically</option>
          <option value="price">Cheapest</option>
        </select>
      </div>
    </section>
  );
};
