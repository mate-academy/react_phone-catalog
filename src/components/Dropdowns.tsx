import React from 'react';
import '../styles/Dropdowns.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const Dropdowns: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || '';

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { sort: e.target.value }),
    );
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { perPage: e.target.value }),
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

        <div className="dropdown__arrow"></div>
      </div>

      <div className="dropdown">
        <p className="dropdown__title">
          Items on page
        </p>

        <select
          value={perPage}
          className="dropdown__select"
          onChange={handlePerPageChange}
        >
          <option value="All">All</option>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
        </select>

        <div className="dropdown__arrow"></div>
      </div>
    </section>
  );
};
